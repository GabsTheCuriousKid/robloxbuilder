import javascriptGenerator from '../javascriptGenerator';

const start = `
if (!Scratch.extensions.unsandboxed) {
  alert("This extension needs to be unsandboxed to run!")
  return
}

function doSound(ab, cd, runtime) {
const audioEngine = runtime.audioEngine;

const fetchAsArrayBufferWithTimeout = (url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let timeout = setTimeout(() => {
      xhr.abort();
      reject(new Error("Timed out"));
    }, 5000);
    xhr.onload = () => {
      clearTimeout(timeout);
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(\`HTTP error \${xhr.status} while fetching \${url}\`));
      }
    };
    xhr.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(\`Failed to request \${url}\`));
    };
    xhr.responseType = "arraybuffer";
    xhr.open("GET", url);
    xhr.send();
  });

const soundPlayerCache = new Map();

const decodeSoundPlayer = async (url) => {
  const cached = soundPlayerCache.get(url);
  if (cached) {
    if (cached.sound) {
      return cached.sound;
    }
    throw cached.error;
  }

  try {
    const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
    const soundPlayer = await audioEngine.decodeSoundPlayer({
      data: {
        buffer: arrayBuffer,
      },
    });
    soundPlayerCache.set(url, {
      sound: soundPlayer,
      error: null,
    });
    return soundPlayer;
  } catch (e) {
    soundPlayerCache.set(url, {
      sound: null,
      error: e,
    });
    throw e;
  }
};

const playWithAudioEngine = async (url, target) => {
  const soundBank = target.sprite.soundBank;

  let soundPlayer;
  try {
    const originalSoundPlayer = await decodeSoundPlayer(url);
    soundPlayer = originalSoundPlayer.take();
  } catch (e) {
    console.warn(
      "Could not fetch audio; falling back to primitive approach",
      e
    );
    return false;
  }

  soundBank.addSoundPlayer(soundPlayer);
  await soundBank.playSound(target, soundPlayer.id);

  delete soundBank.soundPlayers[soundPlayer.id];
  soundBank.playerTargets.delete(soundPlayer.id);
  soundBank.soundEffects.delete(soundPlayer.id);

  return true;
};

const playWithAudioElement = (url, target) =>
  new Promise((resolve, reject) => {
    const mediaElement = new Audio(url);

    mediaElement.volume = target.volume / 100;

    mediaElement.onended = () => {
      resolve();
    };
    mediaElement
      .play()
      .then(() => {
        // Wait for onended
      })
      .catch((err) => {
        reject(err);
      });
  });

const playSound = async (url, target) => {
  try {
    if (!(await Scratch.canFetch(url))) {
      throw new Error(\`Permission to fetch \${url} denied\`);
    }

    const success = await playWithAudioEngine(url, target);
    if (!success) {
      return await playWithAudioElement(url, target);
    }
  } catch (e) {
    console.warn(\`All attempts to play \${url} failed\`, e);
  }
};

playSound(ab, cd)
}`

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} extensionMetadata 
     * @param {object} imageStates 
     * @returns {string} Generated code.
     */
    compile(workspace, extensionMetadata, imageStates) {
        const code = javascriptGenerator.workspaceToCode(workspace);

        const headerCode = [
            `/*`,
            `   This extension was made with RobloxBuilder!`,
            `   https://robloxbuilder.vercel.app/`,
            `*/`
            ``,
            start
        ];
        const classRegistry = {
            top: [``],
            extensionInfo: {},
            bottom: [``],
        }
        const footerCode = [
            ``
        ];
        if (extensionMetadata) {
          classRegistry.extensionInfo.name = extensionMetadata.name;
        }

        return [].concat(headerCode, [
            `${JSON.stringify(classRegistry.extensionInfo).substring(0, JSON.stringify(classRegistry.extensionInfo).length - 1)}`,
        ], code).join('\n');
    }
}

export default Compiler;
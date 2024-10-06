import javascriptGenerator from '../javascriptGenerator';

const start = ``

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} extensionMetadata 
     * @returns {string} Generated code.
     */
    compile(workspace, extensionMetadata) {
        const code = javascriptGenerator.workspaceToCode(workspace);

        const headerCode = [
            `--[[This extension was made with RobloxBuilder`,
            `https://robloxbuilder.vercel.app/ ]]`,
            ``,
        ];
        const classRegistry = {
            top: [`-- idk`],
            extensionInfo: {},
            bottom: [`-- idk`],
        }
        const footerCode = [
            ``
        ];
        if (extensionMetadata) {
          classRegistry.extensionInfo.name = extensionMetadata.name;
        }

        return [].concat(headerCode, code).join('\n');
    }
}

export default Compiler;
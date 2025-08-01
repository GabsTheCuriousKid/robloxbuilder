import luaGenerator from '../luaGenerator';

const start = ``
const tab = `  `

class Compiler {
    /**
     * Generates lua code from the provided workspace & info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} extensionMetadata 
     * @returns {string} Generated code.
     */
    compile(workspace, extensionMetadata) {
        const code = luaGenerator.workspaceToCode(workspace);

        const headerCode = [
            `-- This script was made with RobloxBuilder`,
            `-- https://robloxbuilder.vercel.app/`,
            ``,
            `local rBUtilities = {`,
            `${tab}arrays = {`,
            `${tab}${tab}shuffle = function(array)`,
            `${tab}${tab}${tab}local newArray = {}`,
            `${tab}${tab}${tab}for i = #array, 1, -1 do`,
            `${tab}${tab}${tab}${tab}local j = math.random(i)`,
            `${tab}${tab}${tab}${tab}array[i], array[j] = array[j], array[i]`,
            `${tab}${tab}${tab}${tab}table.insert(newArray, array[i])`,
            `${tab}${tab}${tab}end`,
            ``,
            `${tab}${tab}${tab}return newArray`,
            `${tab}${tab}end`,
            `${tab}},`,
            `${tab}xor = function(bool1, bool2)`,
            `${tab}${tab}return not (not bool1 == not bool2)`,
            `${tab}end,`,
            `${tab}randomString = function(length)`,
            `${tab}${tab}local chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"`,
            `${tab}${tab}local result = {}`,
            `${tab}${tab}for i = 1, length do`,
            `${tab}${tab}${tab}local rand = math.random(1, #chars)`,
            `${tab}${tab}${tab}result[i] = chars:sub(rand, rand)`,
            `${tab}${tab}end`,
            `${tab}${tab}return table.concat(result)`,
            `${tab}end`,
            `}`,
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
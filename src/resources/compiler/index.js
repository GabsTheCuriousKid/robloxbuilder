import luaGenerator from '../luaGenerator';

const tab = `    `
const start = `
local rBUtilities = {
${tab}arrays = {
${tab}${tab}-- shuffles the items of the chosen array
${tab}${tab}shuffle = function(array)
${tab}${tab}${tab}local newArray = table.clone(array)
${tab}${tab}${tab}for i = #newArray, 1, -1 do
${tab}${tab}${tab}${tab}local j = math.random(i)
${tab}${tab}${tab}${tab}array[i], array[j] = array[j], array[i]
${tab}${tab}${tab}end
${tab}${tab}${tab}return newArray
${tab}${tab}end
${tab}},
${tab}objects = {
${tab}${tab}motion = {
${tab}${tab}${tab}-- sets the position of the object to the desired Vector3 coordinates.
${tab}${tab}${tab}-- only works with models or baseparts.
${tab}${tab}${tab}setPositionTo = function(object: Instance, coords: Vector3)
${tab}${tab}${tab}${tab}if object:IsA("Model") then
${tab}${tab}${tab}${tab}${tab}local cf, size = object:GetBoundingBox()
${tab}${tab}${tab}${tab}${tab}local offset = coords - cf.Position
${tab}${tab}${tab}${tab}${tab}for _, part in ipairs(object:GetDescendants()) do
${tab}${tab}${tab}${tab}${tab}${tab}if part:IsA("BasePart") then
${tab}${tab}${tab}${tab}${tab}${tab}${tab}part.CFrame = part.CFrame + offset
${tab}${tab}${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}${tab}elseif object:IsA("BasePart") then
${tab}${tab}${tab}${tab}${tab}object.CFrame = CFrame.new(coords)
${tab}${tab}${tab}${tab}else
${tab}${tab}${tab}${tab}${tab}warn("setPositionTo: setPositionTo only works with Models or BaseParts")
${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}end,
${tab}${tab}${tab}-- changes the position of the object by the desired Vector3 coordinates.
${tab}${tab}${tab}-- only works with models or baseparts.
${tab}${tab}${tab}changePositionBy = function(object: Instance, coords: Vector3)
${tab}${tab}${tab}${tab}if object:IsA("Model") then
${tab}${tab}${tab}${tab}${tab}for _, part in ipairs(object:GetDescendants()) do
${tab}${tab}${tab}${tab}${tab}${tab}if part:IsA("BasePart") then
${tab}${tab}${tab}${tab}${tab}${tab}${tab}part.CFrame = part.CFrame + coords
${tab}${tab}${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}${tab}elseif object:IsA("BasePart") then
${tab}${tab}${tab}${tab}${tab}object.CFrame = object.CFrame + CFrame.new(coords)
${tab}${tab}${tab}${tab}else
${tab}${tab}${tab}${tab}${tab}warn("changePositionBy: changePositionBy only works with Models or BaseParts")
${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}end,
${tab}${tab}${tab}-- gets the position of the object.
${tab}${tab}${tab}-- only works with models or baseparts.
${tab}${tab}${tab}getPositionOf = function(object: Instance): Vector3?
${tab}${tab}${tab}${tab}if object:IsA("Model") then
${tab}${tab}${tab}${tab}${tab}local cf, _ = object:GetBoundingBox()
${tab}${tab}${tab}${tab}${tab}return cf.Position
${tab}${tab}${tab}${tab}elseif object:IsA("BasePart") then
${tab}${tab}${tab}${tab}${tab}return object.Position
${tab}${tab}${tab}${tab}else
${tab}${tab}${tab}${tab}${tab}warn("getPositionOf: Object is not a Model or a BasePart")
${tab}${tab}${tab}${tab}${tab}return nil
${tab}${tab}${tab}${tab}end
${tab}${tab}${tab}end,
${tab}${tab}}
${tab}},
${tab}-- Returns true if exactly one of the two booleans is true;
${tab}-- returns false if both are true or both are false.
${tab}xor = function(bool1, bool2)
${tab}${tab}return not (not bool1 == not bool2)
${tab}end,
${tab}-- generates a random string with the desired length
${tab}randomString = function(length)
${tab}${tab}local chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
${tab}${tab}local result = {}
${tab}${tab}for i = 1, length do
${tab}${tab}${tab}local rand = math.random(1, #chars)
${tab}${tab}${tab}result[i] = chars:sub(rand, rand)
${tab}${tab}end
${tab}${tab}return table.concat(result)
${tab}end
}`

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
            start,
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
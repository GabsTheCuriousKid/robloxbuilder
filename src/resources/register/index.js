import Blockly from 'blockly';
import luaGenerator from '../luaGenerator';

export default (blockName, jsonData, compileFunction) => {
    for (const property in jsonData) {
        if (['previousStatement', 'nextStatement'].includes(property) && jsonData[property] === null) {
            jsonData[property] == 'Regular'
        }
    }

    const blockObject = {
        init: function () {
            this.jsonInit(jsonData);
        }
    };

    // register visual block
    Blockly.Blocks[blockName] = blockObject

    // register block compile function
    luaGenerator[blockName] = compileFunction;
}
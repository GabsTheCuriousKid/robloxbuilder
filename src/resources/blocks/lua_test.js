import registerBlock from '../register/lua';
import luaGenerator from '../luaGenerator';

const categoryPrefix = 'lua_';
const categoryColor = '#FFAB19';

const blockName = `${categoryPrefix}wait`;
const jsonData = {
    message0: 'wait %1 seconds',
    args0: [
        {
            type: 'input_value',
            name: 'NUMBER',
            check: 'Number',
        },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: categoryColor,
};

const compileFunction = (block) => {
    const number = luaGenerator.valueToCode(block, 'NUMBER', luaGenerator.ORDER_ATOMIC);
    return `task.wait(${number});\n`;
};

registerBlock(blockName, jsonData, compileFunction);
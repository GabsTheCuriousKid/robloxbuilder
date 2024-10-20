import registerBlock from '../register/lua';
import luaGenerator from '../luaGenerator';

const categoryPrefix = 'lua_';
const categoryColor = '#FFAB19';

function register() {
    registerBlock(`${categoryPrefix}wait`, {
        message0: 'wait %1 secs',
        args0: [
            {
                "type": "input_value",
                "name": "NUMBER",
                "check": "Number",
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NUMBER = luaGenerator.valueToCode(block, 'NUMBER', luaGenerator.ORDER_ATOMIC)
        
        const code = `task.wait(${NUMBER});`;
        return `${code}\n`;
    });
}

export default register();
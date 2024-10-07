import luaGenerator from '../luaGenerator';
import registerBlock from '../register';

const categoryPrefix = 'control_';
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

    registerBlock(`${categoryPrefix}whiletruedo`, {
        message0: 'while true do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "CODE"
            }
        ],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const Blocks = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `while true do\n${Blocks}end\n`;
        return `${code}\n`;
    });
}

export default register;
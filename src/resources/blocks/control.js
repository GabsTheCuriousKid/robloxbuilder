import javascriptGenerator from '../javascriptGenerator';
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
        const NUMBER = javascriptGenerator.valueToCode(block, 'NUMBER', javascriptGenerator.ORDER_ATOMIC)
        
        const code = `task.wait(${NUMBER});`;
        return `${code}\n`;
    });
}

export default register;
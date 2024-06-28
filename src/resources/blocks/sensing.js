import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'sensing_';
const categoryColor = '#5CB1D6';

function register() {
    registerBlock(`${categoryPrefix}print`, {
        message0: 'print %1',
        args0: [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String",
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC)
        
        const code = `print(${TEXT});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}warn`, {
        message0: 'warn %1',
        args0: [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String",
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC)
        
        const code = `warn(${TEXT});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}error`, {
        message0: 'error %1',
        args0: [
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String",
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC)
        
        const code = `error(${TEXT});`;
        return `${code}\n`;
    });
}

export default register;
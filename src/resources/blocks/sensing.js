import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'sensing_';
const categoryColor = '#5CB1D6';

function register() {
    registerBlock(`${categoryPrefix}print`, {
        message0: 'print %1',
        args0: [
            {
                type: 'input_value',
                name: 'TEXT',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = luaGenerator.valueToCode(block, 'TEXT', luaGenerator.ORDER_ATOMIC)
        
        const code = `print(${TEXT});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}warn`, {
        message0: 'warn %1',
        args0: [
            {
                type: 'input_value',
                name: 'TEXT',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = luaGenerator.valueToCode(block, 'TEXT', luaGenerator.ORDER_ATOMIC)
        
        const code = `warn(${TEXT});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}error`, {
        message0: 'error %1',
        args0: [
            {
                type: 'input_value',
                name: 'TEXT',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = luaGenerator.valueToCode(block, 'TEXT', luaGenerator.ORDER_ATOMIC)
        
        const code = `error(${TEXT});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}time`, {
        message0: 'time (secs) since 1970',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`os.time()`, luaGenerator.ORDER_ATOMIC];
    })
}

export default register;
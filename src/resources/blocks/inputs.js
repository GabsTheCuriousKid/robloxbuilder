import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'inputs_';
const categoryColor = '#FF6680';

function register() {
    registerBlock(`${categoryPrefix}string`, {
        message0: '\'%1\'',
        args0: [
            {
                type: 'field_input',
                name: 'STRING',
                text: 'hello world',
                spellcheck: false,
            },
        ],
        inputsInline: true,
        output: 'String',
        colour: categoryColor,
    }, (block) => {
        const STRING = block.getFieldValue('STRING');
        return [`'${STRING}'`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}number`, {
        message0: '(%1)',
        args0: [
            {
                type: 'field_number',
                name: 'NUMBER',
                value: 0,
            },
        ],
        inputsInline: true,
        output: 'Number',
        colour: categoryColor,
    }, (block) => {
        const NUMBER = block.getFieldValue('NUMBER');
        return [`${NUMBER}`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}nil`, {
        message0: 'nil',
        args0: [],
        inputsInline: true,
        output: 'String',
        colour: categoryColor,
    }, (block) => {
        return [`nil`, luaGenerator.ORDER_ATOMIC];
    });
}

export default register;

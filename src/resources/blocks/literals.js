import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

import colorconverters from '../utils/colorconverters'

const categoryPrefix = 'literals_';
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

    registerBlock(`${categoryPrefix}true`, {
        message0: 'true',
        args0: [],
        inputsInline: true,
        output: 'Boolean',
        colour: categoryColor,
    }, (block) => {
        return [`true`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}false`, {
        message0: 'false',
        args0: [],
        inputsInline: true,
        output: 'Boolean',
        colour: categoryColor,
    }, (block) => {
        return [`false`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}random`, {
        message0: 'random',
        args0: [],
        inputsInline: true,
        output: 'Boolean',
        colour: categoryColor,
    }, (block) => {
        return [`math.random(0, 1) == 1`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}color3`, {
        message0: '%1',
        args0: [
            {
                "type": "field_colour_hsv_sliders",
                "name": "COLOR",
                "colour": "#ff0000"
            }
        ],
        inputsInline: true,
        output: 'String',
        colour: categoryColor,
    }, (block) => {
        const { r, g, b } = colorconverters.hexToRgb(block.getFieldValue('COLOR'));
        return [`Color3.new(${r / 255}, ${g / 255}, ${b / 255})`, luaGenerator.ORDER_ATOMIC];
    });
}

export default register;

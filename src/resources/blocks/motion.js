import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'motion_';
const categoryColor = '#4C97FF';

function register() {
    registerBlock(`${categoryPrefix}movexby`, {
        message0: 'move object %1 x by %2',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'X',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position = ${OBJECT}.Position + Vector3.new(${X},0,0)`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}moveyby`, {
        message0: 'move object %1 y by %2',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position = ${OBJECT}.Position + Vector3.new(0,${Y},0)`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}movezby`, {
        message0: 'move object %1 z by %2',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'Z',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position = ${OBJECT}.Position + Vector3.new(0,0,${Z})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}moveto`, {
        message0: 'move object %1 to x: %2 y: %3 z: %4',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'X',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'String',
            },
            {
                type: 'input_value',
                name: 'Z',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position = ${OBJECT}.Position + Vector3.new(${X},${Y},${Z})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}x`, {
        message0: 'x position of object %1',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position.X`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}y`, {
        message0: 'y position of object %1',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position.Y`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}z`, {
        message0: 'z position of object %1',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)

        const code = `${OBJECT}.Position.Z`;
        return `${code}\n`;
    });
}

export default register;
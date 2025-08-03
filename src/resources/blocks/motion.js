import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'motion_';
const categoryColor = '#4C97FF';

function register() {
    registerBlock(`${categoryPrefix}movexby`, {
        message0: 'change object %1 x by %2',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
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
        const OBJECT = block.getFieldValue('OBJECT')
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)

        const code = `rBUtilities.objects.motion.changePositionBy(${OBJECT}, Vector3.new(${X || 0},0,0)`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}moveyby`, {
        message0: 'change object %1 y by %2',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
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
        const OBJECT = block.getFieldValue('OBJECT')
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)

        const code = `rBUtilities.objects.motion.changePositionBy(${OBJECT}, Vector3.new(0,${Y || 0},0)`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}movezby`, {
        message0: 'change object %1 z by %2',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
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
        const OBJECT = block.getFieldValue('OBJECT')
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC)

        const code = `rBUtilities.objects.motion.changePositionBy(${OBJECT}, Vector3.new(0,0,${Z || 0})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}moveto`, {
        message0: 'change object %1 by x: %2 y: %3 z: %4',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
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
        const OBJECT = block.getFieldValue('OBJECT')
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC)

        const code = `rBUtilities.objects.motion.changePositionBy(${OBJECT}, Vector3.new(${X || 0},${Y || 0},${Z || 0})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}setposofobject`, {
        message0: 'set position of object %1 to x: %2 y: %3 z: %4',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
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
        const OBJECT = block.getFieldValue('OBJECT')
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC)

        const code = `rBUtilities.objects.motion.setPositionTo(${OBJECT}, Vector3.new(${X || 0},${Y || 0},${Z || 0})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}x`, {
        message0: 'x position of object %1',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = block.getFieldValue('OBJECT')

        const code = `rBUtilities.objects.motion.getPositionOf(${OBJECT}).X`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}y`, {
        message0: 'y position of object %1',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = block.getFieldValue('OBJECT')

        const code = `rBUtilities.objects.motion.getPositionOf(${OBJECT}).Y`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}z`, {
        message0: 'z position of object %1',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = block.getFieldValue('OBJECT')

        const code = `rBUtilities.objects.motion.getPositionOf(${OBJECT}).Z`;
        return `${code}\n`;
    });
}

export default register;
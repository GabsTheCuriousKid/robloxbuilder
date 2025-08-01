import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'operators_';
const categoryColor = '#59C059';

function register() {
    registerBlock(`${categoryPrefix}equals`, {
        message0: '%1 = %2',
        args0: [
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
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X} == ${Y})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}greaterthan`, {
        message0: '%1 > %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} > ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}lesserthan`, {
        message0: '%1 < %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} < ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}and`, {
        message0: '%1 and %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Boolean',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Boolean',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`${X} and ${Y}`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}or`, {
        message0: '%1 or %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Boolean',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Boolean',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`${X} or ${Y}`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}xor`, {
        message0: '%1 xor %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Boolean',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Boolean',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`rBUtilities.xor(${X}, ${Y})`, luaGenerator.ORDER_ATOMIC];
    });
    registerBlock(`${categoryPrefix}not`, {
        message0: 'not %1',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Boolean',
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        return [`not ${X}`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}plus`, {
        message0: '%1 + %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} + ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}minus`, {
        message0: '%1 - %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} - ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}times`, {
        message0: '%1 * %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} * ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}divide`, {
        message0: '%1 / %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} / ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}power`, {
        message0: '%1 ^ %2',
        args0: [
            {
                type: 'input_value',
                name: 'X',
                check: 'Number',
            },
            {
                type: 'input_value',
                name: 'Y',
                check: 'Number',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`(${X || 0} ^ ${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}adv`, {
        message0: '%1 of %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "X",
                "options": [
                    [ "absolute", "abs" ],
                    [ "acos", "acos" ],
                    [ "asin", "asin" ],
                    [ "atan", "atan" ],
                    [ "ceiling", "ceil" ],
                    [ "cos", "cos" ],
                    [ "cosh", "cosh" ],
                    [ "deg", "deg" ],
                    [ "exp", "exp" ],
                    [ "floor", "floor" ],
                    [ "frexp", "frexp" ],
                    [ "modf", "modf" ],
                    [ "rad", "rad" ],
                    [ "sign", "sign" ],
                    [ "sin", "sin" ],
                    [ "sinh", "sinh" ],
                    [ "square root", "sqrt" ],
                    [ "tan", "tan" ],
                    [ "tanh", "tanh" ],
                ]
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = block.getFieldValue('X')
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC);

        return [`math.${X}(${Y || 0})`, luaGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}random`, {
        message0: 'pick random %1 to %2',
        args0: [
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
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`math.random(${X || 1}, ${Y || 10})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}contains`, {
        message0: '%1 contains %2',
        args0: [
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
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC)
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC)
        return [`string.match(${Y}, ${X})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}length`, {
        message0: 'length of %1',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        return [`#${OBJECT}`, luaGenerator.ORDER_ATOMIC];
    });
}

export default register;
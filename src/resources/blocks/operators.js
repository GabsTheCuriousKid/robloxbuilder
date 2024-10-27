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
}

export default register;
import { compileVars } from '../compiler/compilerVarSection';
import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'arrays_';
const categoryColor = '#3639BE';

function register() {
    registerBlock(`${categoryPrefix}empty`, {
        message0: 'empty array',
        args0: [],
        inputsInline: true,
        output: 'String',
        colour: categoryColor,
    }, (block) => {
        return [`{}`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}set`, {
        message0: 'set %1 to %2 in array %3',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
            },
            {
                "type": "input_value",
                "name": "Z",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC);
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC);
        const Z = luaGenerator.valueToCode(block, 'Z', luaGenerator.ORDER_ATOMIC);
        return [`(function()\n\tlocal z = ${Z}\n\tx[${X}] = ${Y}\n\treturn x\nend)()`, luaGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}get`, {
        message0: 'get %1 of array %2',
        args0: [
            {
                "type": "input_value",
                "name": "X"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC);
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC);
        return [`${Y}[${X}]`, luaGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}merge`, {
        message0: 'merge array %1 with %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONArray"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = luaGenerator.valueToCode(block, 'X', luaGenerator.ORDER_ATOMIC);
        const Y = luaGenerator.valueToCode(block, 'Y', luaGenerator.ORDER_ATOMIC);
        return [`(function()\n\tlocal x = ${X}\n\tlocal y = ${Y}\n\tfor i=1,#y do\n\t\tx[#x+1] = y[i]\n\tend\n\treturn x\nend)()`, luaGenerator.ORDER_ATOMIC];
    })
}

export default register;
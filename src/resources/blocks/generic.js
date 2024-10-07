import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'generic_';
const categoryColor = '#fff';

function register() {
    // number
    registerBlock(`${categoryPrefix}number`, {
        message0: '%1',
        args0: [
            {
                "type": "field_number",
                "name": "NUMBER",
                "value": 0
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NUMBER = block.getFieldValue('NUMBER');
        const code = `Number(${NUMBER})`;
        return [code, luaGenerator.ORDER_NONE];
    })
    // text
    registerBlock(`${categoryPrefix}text`, {
        message0: '%1',
        args0: [
            {
                "type": "field_input",
                "name": "TEXT",
                "text": ""
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const TEXT = block.getFieldValue('TEXT');
        const code = `String(${JSON.stringify(TEXT)})`;
        return [code, luaGenerator.ORDER_NONE];
    })
    // boolean
    registerBlock(`${categoryPrefix}boolean`, {
        message0: '%1',
        args0: [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    ["True", "true"], 
                    ["False", "false"], 
                    ["Random", "Boolean(Math.round(Math.random()))"]
                ]
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const code = block.getFieldValue('STATE');
        return [code, luaGenerator.ORDER_NONE];
    })
}

export default register;
import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'roblox_';
const categoryColor = '#000000';

function register() {
    registerBlock(`${categoryPrefix}parent`, {
        message0: 'parent of script',
        args0: [],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        return [`script.Parent`, javascriptGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}type`, {
        message0: '%1 \'s %2',
        args0: [
            {
                "type": "input_value",
                "name": "OBJECT",
                "check": "String",
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [ "name", "Name" ],
                    [ "classname", "ClassName" ],
                    [ "parent", "Parent" ],
                ]
            },
        ],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        const OBJECT = javascriptGenerator.valueToCode(block, 'OBJECT', javascriptGenerator.ORDER_ATOMIC)
        const TYPE = block.getFieldValue('TYPE');
        return [`${OBJECT}.${TYPE}`, javascriptGenerator.ORDER_ATOMIC];
    });
}

export default register;
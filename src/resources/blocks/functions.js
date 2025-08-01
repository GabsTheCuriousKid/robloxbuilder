import javascriptGenerator from '../javascriptGenerator';
import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'funcs_';
const categoryColor = '#ff4b4b';

function register() {
    registerBlock(`${categoryPrefix}function`, {
        message0: 'global function %1 %2 values: %3 %4 %5',
        args0: [
            {
                type: "field_input",
                name: "ID",
                text: "id",
                spellcheck: false
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_input",
                name: "VALUES",
                text: "1, 2, ...",
                spellcheck: false
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "FUNC"
            }
        ],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || ''
        const FUNC = luaGenerator.statementToCode(block, 'FUNC');
        
        const code = `function ${ID}(${VALUES}) \n${FUNC}end)`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}localfunction`, {
        message0: 'local function %1 %2 values: %3 %4 %5',
        args0: [
            {
                type: "field_input",
                name: "ID",
                text: "id",
                spellcheck: false
            },
            {
                type: "input_dummy"
            },
            {
                type: "field_input",
                name: "VALUES",
                text: "1, 2, ...",
                spellcheck: false
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "FUNC"
            }
        ],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || ''
        const FUNC = luaGenerator.statementToCode(block, 'FUNC');
        const code = `local function ${ID}(${VALUES}) \n${FUNC}end)`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}callreporter`, {
        message0: 'call %1 values: %2',
        args0: [
            {
                type: "field_input",
                name: "ID",
                text: "id",
                spellcheck: false
            },
            {
                type: "field_input",
                name: "VALUES",
                text: "values",
                spellcheck: false
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || '';
        return [`${ID}(${VALUES})`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}call`, {
        message0: 'call %1 values: %2',
        args0: [
            {
                type: "field_input",
                name: "ID",
                text: "id",
                spellcheck: false
            },
            {
                type: "field_input",
                name: "VALUES",
                text: "values",
                spellcheck: false
            }
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || '';
        
        const code = `${ID}(${VALUES});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}local`, {
        message0: 'local %1 equals %2',
        args0: [
            {
                type: "field_input",
                name: "LOCALNAME",
                text: "text",
                spellcheck: false
            },
            {
                type: "input_value",
                name: "DEFINE"
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const Name = block.getFieldValue('LOCALNAME')
        const Definition = luaGenerator.valueToCode(block, 'DEFINE', luaGenerator.ORDER_ATOMIC)
        
        const code = `local ${Name} = ${Definition}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}localnoeq`, {
        message0: 'local %1',
        args0: [
            {
                type: "field_input",
                name: "LOCALNAME",
                text: "text",
                spellcheck: false
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const Name = block.getFieldValue('LOCALNAME')
        
        const code = `local ${Name}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}localtable`, {
        message0: 'local %1 equals %2 %3',
        args0: [
            {
                type: "field_input",
                name: "LOCALNAME",
                text: "text",
                spellcheck: false
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "TABLE"
            }
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const Name = block.getFieldValue('LOCALNAME')
        const Table = luaGenerator.statementToCode(block, 'TABLE');
        
        const code = `local ${Name} = {${Table}}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}return`, {
        message0: 'return %1',
        args0: [
            {
                type: "input_value",
                name: "VALUE",
            }
        ],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const VALUE = luaGenerator.valueToCode(block, 'VALUE', luaGenerator.ORDER_ATOMIC);
        const code = `return ${VALUE || ''}`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}raw`, {
        message0: 'raw %1',
        args0: [
            {
                type: "field_input",
                name: "RAW",
                text: "text",
                spellcheck: false
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const RAW = block.getFieldValue('RAW')
        
        const code = `${RAW}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}rawreporter`, {
        message0: 'raw %1',
        args0: [
            {
                type: "field_input",
                name: "RAW",
                text: "text",
                spellcheck: false
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const RAW = block.getFieldValue('RAW')
        
        const code = `${RAW}`;
        return [`${code}`, luaGenerator.ORDER_ATOMIC];
    });
}

export default register;
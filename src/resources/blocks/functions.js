import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'funcs_';
const categoryColor = '#ff4b4b';

function register() {
    registerBlock(`${categoryPrefix}function`, {
        message0: 'function %1 %2 values: %3 %4 %5',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "VALUES",
                "text": "1, 2, ...",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || ''
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        const code = `function ${ID}(${VALUES}) { ${FUNC} }`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}call`, {
        message0: 'call %1 values: %2',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "field_input",
                "name": "VALUES",
                "text": "values",
                "spellcheck": false
            }
        ],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const VALUES = block.getFieldValue('VALUES') || '';
        
        const code = `${ID}(${VALUES})`;
        return `${code}\n`;
    });
}

export default register;
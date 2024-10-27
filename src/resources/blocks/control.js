import { compileVars } from '../compiler/compilerVarSection';
import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'control_';
const categoryColor = '#FFAB19';

function register() {
    registerBlock(`${categoryPrefix}wait`, {
        message0: 'wait %1 secs',
        args0: [
            {
                type: 'input_value',
                name: 'NUMBER',
                check: 'Number',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const NUMBER = luaGenerator.valueToCode(block, 'NUMBER', luaGenerator.ORDER_ATOMIC)
        
        const code = `task.wait(${NUMBER});`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}repeat`, {
        message0: 'repeat %1 %2 %3 %4',
        implicitAlign0: "RIGHT",
        args0: [
            {
                type: 'input_value',
                name: 'NUMBER',
                check: 'Number',
            },
            {
                type: "input_dummy"
            },
            {
                type: 'input_statement',
                name: 'CODE',
            },
            {
                "type": "field_image",
                "src": "https://dinobuilder.vercel.app/images/blockIcons/repeat.svg",
                "width": 24,
                "height": 24,
                "alt": "*"
            }
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const VARIABLE = compileVars.new()
        const NUMBER = luaGenerator.valueToCode(block, 'NUMBER', luaGenerator.ORDER_ATOMIC)
        const BLOCKS = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `local ${VARIABLE} = 0;\nrepeat\n${BLOCKS}until ${VARIABLE} > ${NUMBER || 10}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}repeatuntil`, {
        message0: 'repeat until %1 %2 %3 %4',
        implicitAlign0: "RIGHT",
        args0: [
            {
                type: 'input_value',
                name: 'BOOLEAN',
                check: 'Boolean',
            },
            {
                type: "input_dummy"
            },
            {
                type: 'input_statement',
                name: 'CODE',
            },
            {
                "type": "field_image",
                "src": "https://dinobuilder.vercel.app/images/blockIcons/repeat.svg",
                "width": 24,
                "height": 24,
                "alt": "*"
            }
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const VARIABLE = compileVars.new()
        const BOOLEAN = luaGenerator.valueToCode(block, 'BOOLEAN', luaGenerator.ORDER_ATOMIC)
        const BLOCKS = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `repeat\n${BLOCKS}until ${BOOLEAN}`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}whiletruedo`, {
        message0: 'while true do %1 %2',
        args0: [
            {
                type: "input_dummy"
            },
            {
                type: 'input_statement',
                name: 'CODE',
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const Blocks = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `while true do\n${Blocks}end`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}ifthen`, {
        message0: 'if %1 then %2 %3',
        args0: [
            {
                type: "input_value",
                name: "CONDITION",
                check: "Boolean"
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const CONDITION = luaGenerator.valueToCode(block, 'CONDITION', luaGenerator.ORDER_ATOMIC);
        const BLOCKS = luaGenerator.statementToCode(block, 'BLOCKS');
        const code = `if (${CONDITION ? `Boolean(${CONDITION})` : 'false'}) then\n${BLOCKS}end`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}ifthenelse`, {
        message0: 'if %1 then %2 %3 else %4 %5',
        args0: [
            {
                type: "input_value",
                name: "CONDITION",
                check: "Boolean"
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "BLOCKS"
            },
            {
                type: "input_dummy"
            },
            {
                type: "input_statement",
                name: "BLOCKS2"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const CONDITION = luaGenerator.valueToCode(block, 'CONDITION', luaGenerator.ORDER_ATOMIC);
        const BLOCKS = luaGenerator.statementToCode(block, 'BLOCKS');
        const BLOCKS2 = luaGenerator.statementToCode(block, 'BLOCKS2');
        const code = `if (${CONDITION ? `Boolean(${CONDITION})` : 'false'}) then\n${BLOCKS}else\n${BLOCKS2}end`;
        return `${code}\n`;
    })
}

export default register;
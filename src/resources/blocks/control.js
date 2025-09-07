import { compileVars } from '../compiler/compilerVarSection';
import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';
import Blockly from 'blockly/core';

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
        const NUMBER = luaGenerator.valueToCode(block, 'NUMBER', luaGenerator.ORDER_ATOMIC)
        const BLOCKS = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `for i = 1,${NUMBER},1 do \n${BLOCKS}\nend`;
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

    registerBlock(`${categoryPrefix}while`, {
        message0: 'while %1 do %2 %3 %4',
        implicitAlign0: "RIGHT",
        args0: [
            {
                "type": 'input_value',
                "name": 'BOOLEAN',
                "check": 'Boolean',
            },
            {
                "type": "input_dummy"
            },
            {
                "type": 'input_statement',
                "name": 'CODE',
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
        const BOOLEAN = luaGenerator.valueToCode(block, 'BOOLEAN', luaGenerator.ORDER_ATOMIC)
        const BLOCKS = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `while ${BOOLEAN} do\n${BLOCKS}end`;
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

    // This needs init so i don't use registerBlock
    Blockly.Blocks[`${categoryPrefix}forkvinpairs`] = {
        init: function () {
            this.keyVarName_ = compileVars.new();
            this.itemVarName_ = compileVars.new();

            this.jsonInit({
                message0: 'for %1 %2 in %3\(%4\)%5 %6',
                args0: [
                    {
                        "type": "input_value",
                        "name": "KEY",
                        "check": "key"
                    },
                    {
                        "type": "input_value",
                        "name": "ITEM",
                        "check": null
                    },
                    {
                        "type": "field_dropdown",
                        "name": "pairs",
                        "options": [
                            [ "pairs", "pairs" ],
                            [ "ipairs", "ipairs" ],
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "ARRAY",
                        "check": "JSONArray"
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": 'input_statement',
                        "name": 'CODE',
                    }
                ],
                inputsInline: true,
                nextStatement: null,
                previousStatement: null,
                colour: categoryColor,
            })

            this.getVars = () => [this.keyVarName_, this.itemVarName_];

            this.ensureKeyReporter = () => {
                const keyInput = this.getInput('KEY');
                if (!keyInput.connection.targetBlock()) {
                    const reporter = this.workspace.newBlock(`${categoryPrefix}forkvinpairs_key`);
                    reporter.initSvg();
                    reporter.render();

                    keyInput.connection.connect(reporter.outputConnection);
                }
            }

            setTimeout(() => {
                this.ensureKeyReporter();
            }, 1);

            this._workspaceChangeEvent = async (event) => {
                if (event.type === Blockly.Events.BLOCK_MOVE || event.type === Blockly.Events.BLOCK_DELETE) {
                    while (this.workspace && this.rendered && !this.isDisposed_ && (!this.getInput('KEY') || !this.getInput('KEY').connection)) {
                        await new Promise(resolve => setTimeout(resolve, 10))
                    }
                    const keyInput = this.getInput('KEY');
                    if (!keyInput.connection.targetBlock()) {
                        this.ensureKeyReporter();
                    }
                }
                if (event.type === Blockly.Events.BLOCK_MOVE && event.newParentId === this.id && event.inputName === 'KEY') {
                    while (this.workspace && this.rendered && !this.isDisposed_ && (!this.getInput('KEY') || !this.getInput('KEY').connection)) {
                        await new Promise(resolve => setTimeout(resolve, 10))
                    }
                    const connectedBlock = this.getInput('KEY').connection.targetBlock();
                    if (connectedBlock && connectedBlock.type !== `${categoryPrefix}forkvinpairs_key`) {
                        connectedBlock.unplug();
                    }
                }
            }

            this.workspace.addChangeListener(this._workspaceChangeEvent);
        },
        dispose: function (healStack) {
            if (this._workspaceChangeEvent) {
                this.workspace.removeChangeListener(this._workspaceChangeEvent);
                this._workspaceChangeEvent = null;
            }
            const keyInput = this.getInput('KEY');
            if (keyInput && keyInput.connection.targetBlock()) {
                keyInput.connection.targetBlock().dispose(healStack);
                Blockly.BlockSvg.prototype.dispose.call(this, keyInput);
                if (keyInput.connection?.shadowDom) {
                    const shadowBlock = keyInput.connection.targetBlock();
                    if (shadowBlock) {
                        shadowBlock.dispose(healStack);
                    }
                }
            }
            try {
                Blockly.BlockSvg.prototype.dispose.call(this, keyInput);
                this.removeInput('KEY', true);
                this.workspace.resize();
                this.workspace.render();
            } catch {
                // do nothing
            }
            Blockly.BlockSvg.prototype.dispose.call(this, healStack);
            this.workspace.resize();
            this.workspace.render();
        }
    }
    luaGenerator.forBlock[`${categoryPrefix}forkvinpairs`] = function (block) {
        const keyVar = block.getVars()[0];
        const itemVar = block.getVars()[1];
        const PAIRS = block.getFieldValue('pairs');
        const ARRAY = luaGenerator.valueToCode(block, 'ARRAY', luaGenerator.ORDER_ATOMIC);
        const BLOCKS = luaGenerator.statementToCode(block, 'CODE');

        const code = `for ${keyVar},${itemVar} in ${PAIRS}(${ARRAY}) do\n${BLOCKS}end`;
        return code;
    }

    registerBlock(`${categoryPrefix}forkvinpairs_key`, {
        message0: 'index',
        args0: [],
        output: ["Number", "key"],
        colour: categoryColor,
    }, (block) => {
        let parent = block.getSurroundParent();
        while (parent && parent.type !== `${categoryPrefix}forkvinpairs`) {
            parent = parent.getSurroundParent();
        }

        const keyVar = (parent && parent.getVars()[0]) || "k";

        return [keyVar, luaGenerator.ORDER_ATOMIC];
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
        const code = `if ${CONDITION ? `${CONDITION}` : 'false'} then\n${BLOCKS}end`;
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
        const code = `if ${CONDITION ? `${CONDITION}` : 'false'} then\n${BLOCKS}else\n${BLOCKS2}end`;
        return `${code}\n`;
    })
}

export default register;
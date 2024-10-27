import { compileVars } from '../compiler/compilerVarSection';
import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'objects_';
const categoryColor = '#9966FF';

function register() {
    registerBlock(`${categoryPrefix}create`, {
        message0: 'create instance %1 with local %2',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
            },
            {
                type: 'input_value',
                name: 'LOCAL',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const LOCAL = luaGenerator.valueToCode(block, 'LOCAL', luaGenerator.ORDER_ATOMIC)
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)

        const code = `local ${LOCAL || compileVars.new()} = Instance.new(${OBJECT})`;
        return `${code}\n`;
    });
    registerBlock(`${categoryPrefix}chat`, {
        message0: 'object %1 chats %2',
        args0: [
            {
                type: 'field_input',
                name: 'OBJECT',
            },
            {
                type: 'input_value',
                name: 'CHAT',
                check: 'String',
            },
        ],
        nextStatement: null,
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const MESSAGE = luaGenerator.valueToCode(block, 'CHAT', luaGenerator.ORDER_ATOMIC)
        
        const code = `game.Chat:Chat(${OBJECT}, ${MESSAGE}, Enum.ChatColor.Blue);`;
        return `${code}\n`;
    });
}

export default register;
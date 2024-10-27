import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'looks_';
const categoryColor = '#9966FF';

function register() {
    registerBlock(`${categoryPrefix}chat`, {
        message0: 'object %1 chats %2',
        args0: [
            {
                type: 'input_value',
                name: 'OBJECT',
                check: 'String',
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
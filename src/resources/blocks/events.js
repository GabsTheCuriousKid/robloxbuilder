import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'events_';
const categoryColor = '#FFBF00';

function register() {
    registerBlock(`${categoryPrefix}whenplayerjoins`, {
        message0: 'when player joins %1 %2',
        args0: [
            {
                type: 'input_dummy',
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
        
        const code = `game.Players.PlayerAdded:Connect(function(Player)\n${Blocks}end)`;
        return `${code}\n`;
    });

    registerBlock(`${categoryPrefix}every`, {
        message0: 'every %1 seconds do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const TIME = javascriptGenerator.valueToCode(block, 'TIME', javascriptGenerator.ORDER_ATOMIC);
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `while wait(${TIME}) do\n${BLOCKS}\nend`;
        return `${code}\n`;
    })
}

export default register;
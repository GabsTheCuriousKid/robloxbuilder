import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua.js';

const categoryPrefix = 'events_';
const categoryColor = '#FFBF00';

function register() {
    registerBlock(`${categoryPrefix}whenplayerjoins`, {
        message0: 'when player joins %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "CODE"
            }
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const Blocks = luaGenerator.statementToCode(block, 'CODE');
        
        const code = `game.Players.PlayerAdded:Connect(function(Player) ${Blocks} \nend)`;
        return `${code}\n`;
    });
}

export default register;
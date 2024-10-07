// vercel's build doesnt work for some reason
// its related to js generator and how its imported
// so lets just import it the way that it wants

// we COULD modify the lua generator here
// but its much cleaner to leave this alone
import pkg from 'blockly/lua.js';
const { luaGenerator } = pkg;

export default luaGenerator;
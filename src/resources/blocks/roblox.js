import luaGenerator from '../luaGenerator';
import registerBlock from '../register/lua';

const categoryPrefix = 'roblox_';
const categoryColor = '#333333';

function register() {
    registerBlock(`${categoryPrefix}parent`, {
        message0: 'parent of script',
        args0: [],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        return [`script.Parent`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}script`, {
        message0: 'script',
        args0: [],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        return [`script`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}type`, {
        message0: '%1 \'s %2',
        args0: [
            {
                type: "input_value",
                name: "OBJECT",
                check: "String",
            },
            {
                type: "field_dropdown",
                name: "TYPE",
                options: [
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
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const TYPE = block.getFieldValue('TYPE');
        return [`${OBJECT}.${TYPE}`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}typecustom`, {
        message0: '%1 . %2',
        args0: [
            {
                type: "input_value",
                name: "OBJECT",
                check: "String",
            },
            {
                type: "input_value",
                name: "TYPE",
                check: "String",
            },
        ],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const TYPE = luaGenerator.valueToCode(block, 'TYPE', luaGenerator.ORDER_ATOMIC)
        return [`${OBJECT}.${TYPE}`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}typecustom2`, {
        message0: '%1 [%2]',
        args0: [
            {
                type: "input_value",
                name: "OBJECT",
                check: "String",
            },
            {
                type: "input_value",
                name: "TYPE",
                check: "String",
            },
        ],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        const OBJECT = luaGenerator.valueToCode(block, 'OBJECT', luaGenerator.ORDER_ATOMIC)
        const TYPE = luaGenerator.valueToCode(block, 'TYPE', luaGenerator.ORDER_ATOMIC)
        return [`${OBJECT}[${TYPE}]`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}getservice`, {
        message0: 'Get Service %1',
        args0: [
            {
                type: "field_dropdown",
                name: "SERVICE",
                options: [
                    [ "Ad Service", "AdService" ],
                    [ "Asset Service", "AssetService" ],
                    [ "Analytics Service", "AnalyticsService" ],
                    [ "Badge Service", "BadgeService" ],
                    [ "Browser Service", "BrowserService" ],
                    [ "Data Store Service", "DataStoreService" ],
                    [ "Gui Service", "GuiService" ],
                    [ "Lighting", "Lighting" ],
                    [ "Log Service", "LogService" ],
                    [ "Players", "Players" ],
                    [ "Points Service", "PointsService" ],
                    [ "Run Service", "RunService" ],
                    [ "Replicated First", "ReplicatedFirst" ],
                    [ "Replicated Storage", "ReplicatedStorage" ],
                    [ "Run Service", "RunService" ],
                    [ "Script Service", "ScriptService" ],
                    [ "Server Script Service", "ServerScriptService" ],
                    [ "Server Storage", "ServerStorage" ],
                    [ "Sound Service", "SoundService" ],
                    [ "Starter Gui", "StarterGui" ],
                    [ "Starter Pack", "StarterPack" ],
                    [ "Starter Player", "StarterPlayer" ],
                    [ "Teams", "Teams" ],
                    [ "Text Service", "TextService" ],
                    [ "Text Chat Service", "TextChatService" ],
                    [ "Tween Service", "TweenService" ],
                    [ "Workspace", "Workspace" ],
                ]
            },
        ],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        const SERVICE = block.getFieldValue('SERVICE');
        return [`game:GetService('${SERVICE}')`, luaGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}localplayer`, {
        message0: 'local player',
        args0: [],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        return [`game.Players.LocalPlayer`, luaGenerator.ORDER_ATOMIC];
    });
}

export default register;
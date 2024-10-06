import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'roblox_';
const categoryColor = '#000000';

function register() {
    registerBlock(`${categoryPrefix}parent`, {
        message0: 'parent of script',
        args0: [],
        inputsInline: true,
        output: "String",
        colour: categoryColor
    }, (block) => {
        return [`script.Parent`, javascriptGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}type`, {
        message0: '%1 \'s %2',
        args0: [
            {
                "type": "input_value",
                "name": "OBJECT",
                "check": "String",
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
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
        const OBJECT = javascriptGenerator.valueToCode(block, 'OBJECT', javascriptGenerator.ORDER_ATOMIC)
        const TYPE = block.getFieldValue('TYPE');
        return [`${OBJECT}.${TYPE}`, javascriptGenerator.ORDER_ATOMIC];
    });

    registerBlock(`${categoryPrefix}getservice`, {
        message0: 'Get Service %1',
        args0: [
            {
                "type": "field_dropdown",
                "name": "SERVICE",
                "options": [
                    [ "Ad Service", "AdService" ],
                    [ "Asset Service", "AssetService" ],
                    [ "Analytics Service", "AnalyticsService" ],
                    [ "Data Store Service", "DataStoreService" ],
                    [ "Gui Service", "GuiService" ],
                    [ "Lighting", "Lighting" ],
                    [ "Log Service", "LogService" ],
                    [ "Players", "Players" ],
                    [ "Points Service", "PointsService" ],
                    [ "Run Service", "RunService" ],
                    [ "Replicated First", "ReplicatedFirst" ],
                    [ "Replicated Service", "ReplicatedService" ],
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
        return [`game:GetService('${SERVICE}')`, javascriptGenerator.ORDER_ATOMIC];
    });
}

export default register;
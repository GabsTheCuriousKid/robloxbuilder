<script>
    import { onMount } from 'svelte';

    // Components
    import NavigationBar from "$lib/NavigationBar/NavigationBar.svelte";
    import NavigationDivider from "$lib/NavigationBar/Divider.svelte";
    import NavigationButton from "$lib/NavigationBar/Button.svelte";
    import StyledButton from "$lib/StyledComponents/ToolboxButton.svelte";

    // Toolbox
    import Toolbox from "$lib/Toolbox/Toolbox.xml?raw";

    import JSZip from "jszip";
    import beautify from "js-beautify";
    import Prism from "prismjs";
    import * as FileSaver from "file-saver";
    import fileDialog from "../resources/fileDialog";
    import EventManager from "../resources/events";

    import Blockly from "blockly/core";
    import * as ContinuousToolboxPlugin from "@blockly/continuous-toolbox";
    import "@blockly/field-colour-hsv-sliders";

    const Theme = Blockly.Theme.defineTheme("BasicTheme", {
        base: Blockly.Themes.Classic,
        fontStyle: {
            family: '"Source Code Pro", monospace',
            weight: "700",
            size: 12,
        },
        startHats: true,
    });

    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "svelte-blockly";

    import Compiler from "../resources/compiler";
    import preload from "../resources/preload";

    // Blocks
    import registerEvents from "../resources/blocks/events.js";
    import registerControl from "../resources/blocks/control.js";
    import registerSensing from "../resources/blocks/sensing.js";
    import registerInputs from "../resources/blocks/inputs.js";
    registerEvents();
    registerControl();
    registerSensing();
    registerInputs();

    const en = {
        rtl: false,
        msg: {
            ...En,
        },
    };

    import customRenderer from "../resources/renderer"
    Blockly.blockRendering.unregister('custom_renderer') //weird bug
    Blockly.blockRendering.register('custom_renderer', customRenderer)

    const config = {
        toolbox: Toolbox,
        collapse: true,
        comments: true,
        scrollbars: true,
        disable: false,
        theme: Theme,
        renderer: "custom_renderer",
        grid: {
            spacing: 25,
            length: 3,
            colour: "#00000011",
            snap: false,
        },
        zoom: {
            controls: true,
            wheel: false,
            startScale: 0.8,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1,
        },
        plugins: {
            toolbox: ContinuousToolboxPlugin.ContinuousToolbox,
            flyoutsVerticalToolbox: ContinuousToolboxPlugin.ContinuousFlyout,
            metricsManager: ContinuousToolboxPlugin.ContinuousMetrics,
        },
        move: {
            scrollbars: {
                horizontal: true,
                vertical: true,
            },
            drag: true,
            wheel: true,
        },
    };

    let workspace;
    let compiler;
    let projectName = "";
    let projectID = "";
    let lastGeneratedCode = "";

    let luaLoaded = false;

    function updateGeneratedCode() {
        extensionMetadata.name = "Extension";
        extensionMetadata.id = "extensionID";
        if (projectName) {
            extensionMetadata.name = projectName;
        }
        if (projectID) {
            extensionMetadata.id = projectID;
        }
        const code = compiler.compile(
            workspace,
            extensionMetadata
        );
        lastGeneratedCode = code;
    }

    import pkg from '@blockly/workspace-minimap';
    const { PositionedMinimap } = pkg;
    onMount(() => {
        console.log("ignore the warnings above we dont care about those");

        window.onbeforeunload = () => "";
        if (!luaLoaded) {
            const loadLanguages = require("prismjs/components/")
            loadLanguages(['lua']);
            luaLoaded = true;
        }
        compiler = new Compiler(workspace);
        // workspace was changed
        workspace.addChangeListener(updateGeneratedCode);

        EventManager.allowAttachment();
        EventManager.on(EventManager.EVENT_THEME_CHANGED, () => {
            workspace.refreshTheme();
        });

        const minimap = new PositionedMinimap(workspace);
        minimap.init();
    });

    // code display & handling
    function beautifyGeneratedCode(code) {
        const beautified = beautify.js(code, {
            indent_size: 4,
            space_in_empty_paren: true,
        });
        return beautified;
    }
    
    function displayGeneratedCode(code) {
        const highlighted = Prism.highlight(
            code,
            Prism.languages.lua,
            'lua'
        );
        return highlighted;
    }

    function discordInvite() {
        window.open("https://discord.gg/eVQdK8csJc")
    }
</script>

<NavigationBar>
    <NavigationButton on:click={discordInvite}>Discord</NavigationButton>
    <NavigationDivider />
    <NavigationButton on:click={discordInvite}>Save</NavigationButton>
    <NavigationButton on:click={discordInvite}>Load</NavigationButton>
    <NavigationDivider />
    <input
        class="project-name"
        type="text"
        placeholder="Script Name (ex: Script)"
        style="margin-left:4px;margin-right:4px"
        bind:value={projectName}
    />
</NavigationBar>
<div class="main">
    <div class="row-menus">
        <div class="row-first-submenus">
            <div class="blockMenuButtons">
                
            </div>
            <div class="blocklyWrapper">
                <BlocklyComponent {config} locale={en} bind:workspace />
            </div>
        </div>
        <div class="row-submenus">
            <div class="assetsWrapper">
                <h1>Assets</h1>
                <p>There's currently nothing to change here yet.</p>
            </div>
            <div class="row-subsubmenus">
                <div class="codeActionsWrapper">
                    <p style="margin-right: 12px"><b>Generated Code</b></p>
                </div>
                <div class="codeWrapper">
                    <div class="codeDisplay">
                        {@html displayGeneratedCode(lastGeneratedCode)}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>
    :root {
        --nav-height: 3rem;
    }
    input[type="file"]::file-selector-button {
        padding: 0.35rem 1.65rem;

        font-size: 0.75rem;
        color: black;
        background: transparent;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
    }
    input[type="file"]::file-selector-button:focus,
    input[type="file"]::file-selector-button:hover,
    input[type="file"]::file-selector-button:active {
        background: white;
    }

    :global(body.dark) input[type="file"]::file-selector-button {
        color: #ccc;
        border-color: #c6c6c6;
    }
    :global(body.dark) input[type="file"]::file-selector-button:focus,
    :global(body.dark) input[type="file"]::file-selector-button:hover,
    :global(body.dark) input[type="file"]::file-selector-button:active {
        background: #111;
    }

    :global(body.dark) input[type="text"],
    :global(body.dark) input[type="number"] {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.7);
        color: white;
    }
    :global(body.dark) input[type="text"]:hover,
    :global(body.dark) input[type="number"]:hover {
        background: transparent;
        border: 1px solid dodgerblue;
    }

    .main {
        position: absolute;
        left: 0px;
        top: var(--nav-height);
        width: 100%;
        height: calc(100% - var(--nav-height));

        min-width: 870px;
    }

    .project-name {
        width: 236px;

        font-size: 20px;

        border-radius: 6px;
        outline: 1px dashed rgba(0, 0, 0, 0.15);
        border: 0;
        background: rgba(255, 255, 255, 0.25);
        color: white;

        font-weight: bold;
        font-size: 1rem;
        padding: 0.5rem;
        transition: 0.25s;
    }
    .project-name::placeholder {
        font-weight: normal;
        color: white;
        opacity: 1;
        font-style: italic;
    }
    .project-name:hover {
        background-color: hsla(0, 100%, 100%, 0.5);
        transition: 0.25s;
    }
    .project-name:active,
    .project-name:focus {
        outline: none;
        border: 1px solid hsla(0, 100%, 100%, 0);
        box-shadow: 0 0 0 calc(0.5rem * 0.5) hsla(0, 100%, 100%, 0.25);
        background-color: hsla(0, 100%, 100%, 1);
        color: black;
        transition: 0.25s;
    }

    .project-name[data-invalid="true"] {
        background-color: #ffabab;
        text-decoration: red underline;
    }
    :global(body.dark) .project-name[data-invalid="true"] {
        background-color: #9b0000 !important;
        text-decoration: red underline;
    }

    .extensionIcon {
        width: 96px;
        height: 96px;
        object-fit: contain;
    }

    .row-menus {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .row-submenus {
        display: flex;
        flex-direction: column;
        width: 35%;
        height: 100%;
    }
    .row-first-submenus {
        display: flex;
        flex-direction: column;
        width: 65%;
        height: 100%;
    }
    .row-subsubmenus {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50%;
    }

    .extensionMenuPreview {
        width: 60px;
        cursor: pointer;
        overflow: hidden;
        color: #575e75;
        user-select: none;
    }
    .extensionMenuPreview:hover {
        color: #4c97ff !important;
    }
    .extensionMenuPreview:focus,
    .extensionMenuPreview:active {
        background-color: #e9eef2;
    }
    :global(body.dark) .extensionMenuPreview {
        color: #ccc;
    }
    :global(body.dark) .extensionMenuPreview:focus,
    :global(body.dark) .extensionMenuPreview:active {
        background-color: #1e1e1e;
    }
    .extensionBubbleIcon {
        width: 20px;
        height: 20px;
        background-size: 100%;
        border-radius: 100%;
        margin: 0 auto 0.125rem;
        border: 1px rgba(0, 0, 0, 0.2) solid;
    }
    .extensionBubbleName {
        font-size: 0.65rem;
    }

    .blockMenuButtons {
        position: relative;
        width: 100%;
        height: 48px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #f9f9f9;
    }
    :global(body.dark) .blockMenuButtons {
        background-color: #111;
    }

    .blocklyWrapper {
        position: relative;
        width: 100%;
        height: calc(100% - 48px);
    }
    .assetsWrapper {
        position: relative;
        width: calc(100% - 16px);
        height: calc(50% - 16px);
        padding: 8px;
        overflow: auto;
    }
    .codeActionsWrapper {
        position: relative;
        width: 100%;
        height: 48px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #f9f9f9;
    }
    :global(body.dark) .codeActionsWrapper {
        background-color: #111;
    }
    .codeWrapper {
        position: relative;
        width: 100%;
        height: calc(100% - 48px);
    }

    .codeDisplay {
        width: 100%;
        height: 100%;

        border: 0;
        padding: 0;
        overflow: auto;

        background: #f9f9f9;
        white-space: pre-wrap;
        font-family: monospace !important;
    }
    :global(body.dark) .codeDisplay {
        background-color: #111;
    }

    .warning {
        background-color: yellow;
        color: black;
    }
</style>
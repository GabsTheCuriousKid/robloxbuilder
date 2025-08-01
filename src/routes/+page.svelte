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
    import 'prismjs/components/prism-lua.min.js';
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

    Blockly.VerticalFlyout.prototype.getFlyoutScale = function () {
        return config.zoom.startScale;
    };

    import En from "blockly/msg/en";
    import "blockly/blocks";

    import BlocklyComponent from "svelte-blockly";

    import Compiler from "../resources/compiler";
    import preload from "../resources/preload";

    // Blocks
    import registerMotion from "../resources/blocks/motion.js";
    import registerObjects from "../resources/blocks/objects.js";
    import registerEvents from "../resources/blocks/events.js";
    import registerControl from "../resources/blocks/control.js";
    import registerSensing from "../resources/blocks/sensing.js";
    import registerOperators from "../resources/blocks/operators.js";
    import registerLiterals from "../resources/blocks/literals.js";
    import registerFunctions from "../resources/blocks/functions.js";
    import registerArrays from "../resources/blocks/arrays.js";
    import registerRoblox from "../resources/blocks/roblox.js";
    registerMotion();
    registerObjects();
    registerEvents();
    registerControl();
    registerSensing();
    registerOperators();
    registerLiterals();
    registerFunctions();
    registerArrays();
    registerRoblox();

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
    let lastGeneratedCode = "";

    let luaLoaded = false;

    const extensionMetadata = {
        name: "Script",
    };

    function updateGeneratedCode() {
        extensionMetadata.name = "Extension";
        extensionMetadata.id = "extensionID";
        if (projectName) {
            extensionMetadata.name = projectName;
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
        window.onbeforeunload = () => "";
        if (!luaLoaded) {
            import("prismjs/components/").then((module) => {
                module.default(['lua']);
                console.log("Lua language loaded:", Prism.languages.lua);
                luaLoaded = true;
            })
            .catch((error) => console.error("Failed to load Prism languages:", error));
        }
        console.log("ignore the warnings and errors above we dont care about those");

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

    function downloadProject() {
        // generate file name
        let filteredProjectName = (projectName).replace(/[^a-z0-9\-]+/gim, "_");
        let fileName = filteredProjectName + ".rb";
        if (!filteredProjectName) {
            fileName = "MyProject.rb";
        }

        // data
        let projectData = Blockly.serialization.workspaces.save(workspace)

        // modify data by me wow
        projectData = {
            blockly: projectData,
            metadata: extensionMetadata,
        }

        // zip
        const zip = new JSZip();
        zip.file(
            "README.txt",
            "This file is not meant to be opened!" +
                "\nBe careful as you can permanently break your project!"
        );

        // data
        const data = zip.folder("data");
        data.file("project.json", JSON.stringify(projectData));

        // download
        zip.generateAsync({ type: "blob" }).then((blob) => {
            FileSaver.saveAs(blob, fileName);
        });
    }
    function loadProject() {
        fileDialog({ accept: ".rb" }).then((files) => {
            if (!files) return;
            const file = files[0];

            const projectNameIdx = file.name.lastIndexOf(".tb");

            JSZip.loadAsync(file.arrayBuffer()).then(async (zip) => {
                console.log("loaded zip file...");

                // get project json from the data folder
                const dataFolder = zip.folder("data");
                const projectJsonString = await dataFolder
                    .file("project.json")
                    .async("string");
                const projectJson = JSON.parse(projectJsonString);

                // do your thing
                projectName = projectJson.metadata.name
                for (var i in projectJson.metadata) {
                    var v = projectJson.metadata[i]
                    extensionMetadata[i] = v
                }
                for (var i in projectJson.images) {
                    var v = projectJson.images[i]
                    extensionImageStates[i] = v
                }

                // get project workspace xml stuffs
                const workspacesFolder = zip.folder("workspaces");
                const fileNames = [];
                workspacesFolder.forEach((_, file) => {
                    const fileName = file.name.replace("workspaces/", "");
                    fileNames.push(fileName);
                });
                // console.log(fileNames); // debug
                const idWorkspacePairs = {};
                for (const fileName of fileNames) {
                    const idx = fileName.lastIndexOf(".xml");
                    const id = fileName.substring(0, idx);
                    // assign to pairs
                    idWorkspacePairs[id] = await workspacesFolder
                        .file(fileName)
                        .async("string");
                }
                // console.log(idWorkspacePairs); // debug

                // laod
                console.log(projectJson); // debug
                Blockly.serialization.workspaces.load(projectJson.blockly, workspace);

                updateGeneratedCode()
            });
        });
    }

    // code display & handling
    function beautifyGeneratedCode(code) {
        const beautified = code
        return beautified;
    }
    
    function displayGeneratedCode(code) {
        try {
            if (!code) {
                return "<p>No code generated yet.</p>";
            }
            const highlighted = Prism.highlight(code, Prism.languages.lua, 'lua');
            return highlighted;
        } catch (error) {
            console.error("Error highlighting code:", error);
            return "<p>Error displaying code.</p>";
        }
    }
</script>

<NavigationBar>
    <NavigationButton on:click={downloadProject}>Save</NavigationButton>
    <NavigationButton on:click={loadProject}>Load</NavigationButton>
    <NavigationDivider />
    <input
        class="project-name"
        type="text"
        placeholder="Script Name (ex: Script)"
        style="margin-left:4px;margin-right:4px"
        bind:value={projectName}
        on:change={updateGeneratedCode}
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
<script>
    import { createEventDispatcher } from "svelte";
    import ColorUtil from "./color.js";

    import colorExample from "./extensionColorExample.svg?raw";

    export let color1 = "#ff0000";
    export let color2 = "#00ff00";
    export let color3 = "#0000ff";

    let color3Included = false;
    export let tbShow = true;

    const dispatch = createEventDispatcher();

    function event() {
        console.log(color3Included);
        if (!color3Included) {
            color3 = "";
        }
        if (color3Included && !color3) {
            color3 = "#000000";
        }
        dispatch("completed", {
            color1,
            color2,
            color3,
            tbShow
        });
    }
    function cancel() {
        dispatch("cancel");
    }

    function getExampleData(color1, color2, color3, color3Included) {
        const tokens = ["[{{COLOR1}}]", "[{{COLOR2}}]", "[{{COLOR3}}]"];
        if (color3Included && !color3) {
            color3 = "#000000";
        }
        if (!color3 || !color3Included) {
            const rgb = ColorUtil.hexToRGB(color1);
            const r = Math.max(0, rgb.r - 51);
            const g = Math.max(0, rgb.g - 51);
            const b = Math.max(0, rgb.b - 51);
            color3 = ColorUtil.rgbToHex(r, g, b);
        }
        return colorExample
            .replaceAll(tokens[0], color1)
            .replaceAll(tokens[1], color2)
            .replaceAll(tokens[2], color3);
    }
    function getExampleURL(...args) {
        const data = getExampleData(...args);
        return "data:image/svg+xml," + encodeURIComponent(data);
    }
</script>

<div class="bg">
    <div class="modal">
        <div class="modal-title">
            <p>Colors</p>
        </div>
        <div class="modal-content">
            <div
                style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%"
            >
                <p>Choose the colors used in your extension's blocks & menu.</p>
                <div
                    style="display:flex;flex-direction:row;align-items:center;"
                >
                    <label>
                        Primary
                        <input type="color" bind:value={color1} />
                    </label>
                    <div style="margin-left:6px" />
                    <label>
                        Secondary
                        <input type="color" bind:value={color2} />
                    </label>
                    <div style="margin-left:6px" />
                    <label>
                        Teritary
                        <input type="color" bind:value={color3} />
                    </label>
                </div>
                <div
                    style="display:flex;flex-direction:row;align-items:center;"
                >
                    <label>
                        Include Teritary Color
                        <input type="checkbox" bind:checked={color3Included} />
                    </label>
                </div>
                <div
                    style="display:flex;flex-direction:row;align-items:center;"
                >
                    <label>
                        TurboBuilder Indicator (PenguinMod Experimental Feature)
                        <input type="checkbox" bind:checked={tbShow} />
                    </label>
                </div>
                <div
                    style="display:flex;flex-direction:row;align-items:center;"
                >
                    <div class="extensionMenuPreview">
                        <div style="text-align: center;">
                            <div
                                class="extensionBubbleIcon"
                                style={`background: ${color1}; border-color: ${color2}`}
                            >
                                {#if tbShow}
                                    <img
                                        class="tbBubbleIcon"
                                        src="favicon.png"
                                        alt="TurboBuilder"
                                    />
                                {/if}
                            </div>
                            <div class="extensionBubbleName">Extension</div>
                        </div>
                    </div>

                    <img
                        alt="Color preview"
                        src={getExampleURL(
                            color1,
                            color2,
                            color3,
                            color3Included
                        )}
                    />
                </div>
            </div>
        </div>
        <div class="modal-buttons">
            <button class="button-cancel" on:click={cancel}>Cancel</button>
            <div style="margin-left:6px" />
            <button class="button-accept" on:click={event}>OK</button>
            <div style="margin-left:24px" />
        </div>
    </div>
</div>

<style>
    .button-cancel {
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: black;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }
    .button-accept {
        border: 1px solid #ff4b4b;
        background: #ff4b4b;
        color: white;
        font-weight: bold;
        padding: 0.75rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        cursor: pointer;
    }

    label {
        font-weight: bold;
        font-size: 0.625rem;
        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    input[type="color"] {
        margin-left: 3px;
    }
    img {
        cursor: not-allowed;
    }

    /* color picker */
    input[type="color"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    input[type="color"]::-webkit-color-swatch {
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }
    input[type="color"]::-moz-color-swatch {
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }

    :global(body.dark) input[type="color"]::-webkit-color-swatch {
        border-color: rgba(255, 255, 255, 0.5);
    }
    :global(body.dark) input[type="color"]::-moz-color-swatch {
        border-color: rgba(255, 255, 255, 0.5);
    }

    .bg {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: #ff4b4bb0;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .modal {
        width: 60%;
        height: 50%;
        outline: 4px solid hsla(0, 100%, 100%, 0.25);
        border-radius: 0.5rem;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }
    :global(body.dark) .bg {
        background-color: #333333b0;
    }
    :global(body.dark) .modal {
        background-color: #111;
    }

    .modal-title {
        width: 100%;
        height: 10%;
        background: #ff4b4b;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    :global(body.dark) .modal-title {
        background-color: #333;
    }
    .modal-content {
        width: 100%;
        height: 75%;
        overflow: auto;
    }
    .modal-buttons {
        width: 100%;
        height: 15%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
    }

    .extensionMenuPreview {
        width: 60px;
        position: relative;
        cursor: pointer;
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

    .tbBubbleIcon {
        width: 16px;
        height: 16px;
        background: #0006;
        backdrop-filter: blur(2px);
        border-radius: 8px;
        position: absolute;
        top: -3px;
        right: -3px;
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
        position: relative;
    }
    .extensionBubbleName {
        font-size: 0.65rem;
    }
</style>
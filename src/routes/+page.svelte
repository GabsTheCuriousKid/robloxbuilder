<script>
    import { onMount } from 'svelte';

    // Components
    import NavigationBar from "$lib/NavigationBar/NavigationBar.svelte";
    import NavigationDivider from "$lib/NavigationBar/Divider.svelte";
    import NavigationButton from "$lib/NavigationBar/Button.svelte";
    import StyledButton from "$lib/StyledComponents/ToolboxButton.svelte";

    onMount(() => {
        console.log("ignore the warnings above we dont care about those");

        window.onbeforeunload = () => "";
    });

    function discordInvite() {
        window.open("https://discord.gg/eVQdK8csJc")
    }
</script>

<NavigationBar>
    <NavigationButton on:click={discordInvite}>Discord</NavigationButton>
    <NavigationDivider />
    <NavigationButton on:click={}>Save</NavigationButton>
    <NavigationButton on:click={}>Load</NavigationButton>
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
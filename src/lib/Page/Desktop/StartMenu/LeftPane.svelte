<script lang="ts">
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { WindowStore } from "../../../../ts/applogic/store";
  import AppListItem from "./AppListItem.svelte";
</script>

<div class="left">
  {#each $WindowStore as app}
    {#if isPopulatable(app)}
      <AppListItem {app} />
    {/if}
  {/each}
</div>

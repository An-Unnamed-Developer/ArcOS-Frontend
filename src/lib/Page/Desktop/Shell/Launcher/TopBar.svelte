<script lang="ts">
  import {
    isFullscreenWindow,
    maxZIndex,
  } from "../../../../../ts/applogic/store";
  import { NotificationStore } from "../../../../../ts/notiflogic/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import Tray from "../../Taskbar/Tray.svelte";
</script>

<div
  class="launcher-topbar"
  class:docked={$UserData.sh.taskbar.docked}
  class:colored={$UserData.sh.taskbar.colored}
  class:visible={!$isFullscreenWindow}
  style="z-index: {$maxZIndex + 22}"
>
  <Tray hasClock={false}>
    {Object.entries($NotificationStore).length} Notifications
  </Tray>
</div>

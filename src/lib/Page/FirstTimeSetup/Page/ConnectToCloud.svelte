<script lang="ts">
  import connectIcon from "../../../../assets/fts/connect.svg";
  import "../../../../css/fts/page/connecttocloud.css";
  import { setAuthcode } from "../../../../ts/api/authcode";
  import { addServer } from "../../../../ts/api/server";
  import { testConnection } from "../../../../ts/api/test";
  import { applyFTSState } from "../../../../ts/fts/main";
  import { ArcSoundBus } from "../../../../ts/sound/main";
  import Nav from "../Nav.svelte";

  let server = "";
  let connecting = false;
  let connectionError = false;
  let authCode = "";

  async function connect() {
    connecting = true;
    connectionError = false;

    const testSuccess = await testConnection(server.trim(), authCode.trim());

    if (testSuccess) {
      addServer(server.trim());
      setAuthcode(server.trim(), authCode.trim());

      applyFTSState("authmode");
    } else {
      ArcSoundBus.playSound("arcos.dialog.error");
      connectionError = true;
    }

    connecting = false;
  }
</script>

<div class="header centered">
  <img src={connectIcon} alt="Mode" />
  <h1>Time to get connected</h1>
  <p class="subtitle">Enter the hostname of your ArcAPI:</p>
</div>
<input
  class="fullwidth centered"
  placeholder="Server name"
  bind:value={server}
/>
<input
  class="fullwidth centered"
  placeholder="Server authentication code (optional)"
  bind:value={authCode}
/>
<button
  class="fullwidth option centered"
  disabled={!server || connecting}
  on:click={connect}
>
  {#if !connecting}Connect to server{:else}Connecting...{/if}
</button>
{#if connectionError}
  <p class="fullwidth centered connect-error">
    <span class="material-icons-round">error</span>Connection to ArcAPI failed!
  </p>
{/if}
<Nav
  data={{
    back: {
      disabled: false,
      redir: "license",
    },
    forw: {
      disabled: true,
      redir: "authform",
    },
    prog: {
      max: 4,
      val: 3,
    },
  }}
/>

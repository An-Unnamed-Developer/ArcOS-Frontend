<script lang="ts">
  import type { PartialUserDir } from "../../../../ts/api/interface";
  import {
    fbClass,
    FileBrowserCuttingFilename as cutting,
    FileBrowserSelectedFilename,
  } from "../../../../ts/applogic/apps/FileBrowser/main";
  import icon from "../../../../assets/apps/filemanager/folder.svg";

  export let dir: PartialUserDir;

  function select() {
    $FileBrowserSelectedFilename = dir.name;
  }

  function open() {
    fbClass.goToDirectory(dir.scopedPath);
  }
</script>

<button
  class="item dir"
  on:click={select}
  on:dblclick={open}
  class:selected={$FileBrowserSelectedFilename == dir.name}
  class:cutting={$cutting && $cutting.name == dir.name}
  data-path={dir.scopedPath}
  data-type="dir"
  data-name={dir.name}
  data-caller="listitem-dir"
>
  <div class="image"><img src={icon} alt={dir.name} /></div>
  <div class="name">{dir.name}</div>
  <div class="mime">Folder</div>
  <div class="size">-</div>
</button>

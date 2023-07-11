<script>
  // COMPONENTS
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { format as formatStore, files as filesStore, dataSnippet as dataSnippetStore, currentFile } from "../store.js";
  import { bytesHuman, comma } from "ak-tools";
  import { parser, readFile } from "../utils.js";

  // STATE
  let files = [];
  let format;
  let filePickerEl;

  //   METHODS
  async function handleDrop(e) {
    const { acceptedFiles } = e.detail;
    files = [...acceptedFiles, ...files];
    await handleUpdate();
  }

  async function handleUpdate() {
    if (files && files.length) {
      //detect the file format
      format = files[0].name.split(".").pop();
      formatStore.set(format);

      //read each file
      for (const file of files) {
        const data = await readFile(file); //todo replace with streaming?
        file.lines = data?.split("\n")?.length || "not known";
        const store = {
          name: file.name,
          size: file.size,
          lines: file.lines,
          format,
          data: parser(data, format),
        };
        dataSnippetStore.set(store);
        currentFile.set(file.name);
      }
      filesStore.update((currentFiles) => [...currentFiles, ...files]);
      files = [];
    }
  }

  function resetFiles() {
    filesStore.update((currentFiles) => []);
    return true;
  }

  function handleSwitchToTransform(e) {
	//todo: make it easy to select the file you are working on
  }

  //   CSS
  const tableRow = `bg-white border-b opacity-50 hover:opacity-100`;
  const dropzoneCSS = `bg-mpWhite w-full h-full rounded text-center flex justify-center items-center border-2 border-mpPurple border-dashed hover:border-mpOrange`;
</script>

<!-- DROPZONE -->
<!-- ? https://github.com/thecodejack/svelte-file-dropzone -->
<div class="title ml-6 pt-4 text-mpGray">Upload File(s)</div>
<div class="flex justify-center flex-col ml-6 mr-36 p-10 px-5 py-5 space-y-4 h-52 text-center">
  <input bind:this={filePickerEl} type="file" name="file_upload" class="hidden" multiple bind:files on:change={handleUpdate} />
  <Dropzone
    accept=".csv, .txt, .json, .ndjson, .jsonl, .txt, .tsv"
    on:drop={handleDrop}
    containerClasses={dropzoneCSS}
    inputElement={filePickerEl}
    disableDefaultStyles
    name="dropzone"><p>drag and drop ANY plain text file (or <button>click and browse</button>)</p></Dropzone
  >
</div>

<!-- FILE DETAILS -->
{#if $filesStore && $filesStore.length > 0}
  <div class="ml-6">
    <button class="btn_clear" on:click={resetFiles}>Clear</button>
  </div>
  <div class="title ml-6 pt-4 text-mpGray">File Details</div>

  <div class="flex shadow-md sm:rounded-lg ml-10 mt-5 p-10 px-5 py-5 mr-36 pb-11 mb-11 bg-white">
    <table class="w-full text-sm text-left text-mpGray table-sm">
      <thead class="text-mpPurple text-base">
        <tr>
          <th class="px-6 py-1.5">Name</th>
          <th class="px-6 py-1.5">Size</th>
          <th class="px-6 py-1.5">Type</th>
          <th class="px-6 py-1.5"> Lines</th>
        </tr>
      </thead>
      <tbody>
        {#each $filesStore as file}
          <tr class={tableRow}>
            <td class="px-6 py-1.5">{file.name}</td>
            <td class="px-6 py-1.5">{bytesHuman(file.size)}</td>
            <td class="px-6 py-1.5">{file.name.split(".").pop()}</td>
            <td class="px-6 py-1.5">{comma(file.lines || 0)}</td>
            <!-- <td class="px-6 py-1.5">
              <button on:click={handleSwitchToTransform} class="btn p-2 bg-mpGray border-mpGray hover:bg-mpPurple hover:border-mpPurple"> transform </button>
            </td> -->            
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

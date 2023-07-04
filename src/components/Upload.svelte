<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { format as formatStore, files as filesStore, dataSippet as dataSnippetStore } from "../store.js";
  import { bytesHuman, comma } from "ak-tools";

  const tableRow = `bg-white border-b opacity-50 hover:opacity-100`;
  const tableHead = `px-6 py-4 font-medium text-gray-900 whitespace-nowrap`;
  let files;
  let format;
  //   let dataSnippet;

  async function handleUpdate() {
    if (files) {
      //detect the file format
      format = files[0].name.split(".").pop();
      formatStore.set(format);

      //read each file
      for (const file of files) {
        const data = await readFile(file);
        file.lines = data.split("\n").length;
        dataSnippetStore.set(data);
      }
      filesStore.update((currentFiles) => [...currentFiles, ...files]);
    }
  }

  function resetFiles() {
    filesStore.update((currentFiles) => []);
    return true;
  }

  async function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result.toString());
      reader.onerror = reject;
      reader.readAsText(file, "UTF-8");
    });
  }

  //   https://stackoverflow.com/a/28318964
  function parseFile(file, callback) {
    var fileSize = file.size;
    var chunkSize = 64 * 1024; // bytes
    var offset = 0;
    var self = this; // we need a reference to the current object
    var chunkReaderBlock = null;

    var readEventHandler = function (evt) {
      if (evt.target.error == null) {
        offset += evt.target.result.length;
        callback(evt.target.result); // callback for handling read chunk
      } else {
        console.log("Read error: " + evt.target.error);
        return;
      }
      if (offset >= fileSize) {
        console.log("Done reading file");
        return;
      }

      // of to the next chunk
      chunkReaderBlock(offset, chunkSize, file);
    };

    chunkReaderBlock = function (_offset, length, _file) {
      var r = new FileReader();
      var blob = _file.slice(_offset, length + _offset);
      r.onload = readEventHandler;
      r.readAsText(blob);
    };

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
  }
</script>

<!-- ? https://github.com/thecodejack/svelte-file-dropzone -->
<div class="title ml-6 pt-4 text-mpGray">Upload File(s)</div>
<div class="flex justify-center flex-col ml-6 p-10 px-5 py-5 space-y-4">
  <!-- DROPZONE -->
  <label class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
    <span class="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span class="font-medium text-gray-600">
        Drop files to Attach, or
        <span class="text-blue-600 underline">browse</span>
      </span>
    </span>
    <!-- FILE PICKER -->
    <input type="file" name="file_upload" class="hidden" multiple bind:files on:change={handleUpdate} />
  </label>
</div>

<!-- RESET -->

<!-- FILE DETAILS -->
{#if $filesStore && $filesStore.length > 0}
  <div class="ml-6">
    <button class="rounded-lg btn btn-secondary w-fit bg-mpGray border-mpGray hover:bg-mpRed hover:border-mpRed" on:click={resetFiles}>Clear</button>
  </div>
  <div class="title ml-6 pt-4 text-mpGray">File Details</div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg ml-10 mt-5 p-10 px-5 py-5 w-2/3 bg-white">
    <table class="w-full text-sm text-left text-mpGray">
      <thead class="text-mpPurple text-base">
        <tr>
          <th class="px-6 py-4">Name</th>
          <th class="px-6 py-4">Size</th>
          <th class="px-6 py-4">Type</th>
          <th class="px-6 py-4"> Lines</th>
        </tr>
      </thead>
      <tbody>
        {#each $filesStore as file}
          <tr class={tableRow}>
            <td class="px-6 py-4">{file.name}</td>
            <td class="px-6 py-4">{bytesHuman(file.size)}</td>
            <td class="px-6 py-4">{file.name.split(".").pop()}</td>
            <td class="px-6 py-4">{comma(file.lines || 0)}</td>
          </tr>
          <!-- <li class="text-mpGreen text-xs"> : </li> -->
        {/each}
      </tbody>
    </table>
  </div>
{/if}

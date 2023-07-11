<script>
  import {
    token as tokenStore,
    secret as secretStore,
    region as regionStore,
    format as formatStore,
    files as filesStore,
    dataType as dataTypeStore,
    aliases as aliasesStore,
    transformType as transformTypeStore,
  } from "../store.js";
  import Project from "./components/Project.svelte";
  import { truncate, comma, bytesHuman } from "ak-tools";

  let jobResult = null;
  //   METHODS

  function getConfig() {
    return {
      token: $tokenStore,
      secret: $secretStore,
      region: $regionStore,
      format: $formatStore,
      dataType: $dataTypeStore,
      aliases: $aliasesStore,
      files: $filesStore,
      transformType: $transformTypeStore,
    };
  }

  async function uploadFiles(config, files) {
    const formData = new FormData();
    files.forEach((file, i) => formData.append(`file${i}`, file));
    const req = await fetch("/load", {
      method: "POST",
      headers: {
        "X-Job-Configuration": JSON.stringify(config),
      },
      body: formData,
    });
    const res = await req.json();
    return res;
  }

  async function handleUpload() {
    const config = getConfig();
    const files = $filesStore;
    const res = await uploadFiles(config, files);
    return res;
  }

  function cullResults(source) {
    /** @type {import('mixpanel-import').ImportResults}*/
    const resultsTemplate = {
      total: 0,
      success: 0,
      failed: 0,
      requests: 0,
      batches: 0,
      human: "",
      // @ts-ignore
      bytesHuman: "",
      eps: 0,
      retries: 0,
      filename: "",
    };
    const keysToPick = Object.keys(resultsTemplate);

    const picked = source.map((item) =>
      keysToPick.reduce((obj, key) => {
        if (key in item) {
          //numbers should have commas!
          if (!Number.isNaN(Number(item[key]))) {
            obj[key] = comma(item[key]);
          } else {
            obj[key] = item[key];
          }
        }
        return obj;
      }, {})
    );
    return picked;
  }
  //   CSS
  const tableRow = `bg-white border-b opacity-50 hover:opacity-100`;
  const tableHead = `px-6 py-4 font-medium text-gray-900 whitespace-nowrap`;
</script>

<Project />
<div class="title ml-6 pt-4 text-mpGray">Data Loader</div>
<div class="flex justify-center flex-col pt-5 p-10 space-y-4">
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3">
    <table class="w-full text-sm text-left text-gray-500">
      <tbody>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Token </th>
          <td class="px-6 py-4"> {$tokenStore || "------"} </td>
        </tr>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Secret </th>
          <td class="px-6 py-4"> {$secretStore || "------"} </td>
        </tr>

        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Region </th>
          <td class="px-6 py-4"> {$regionStore || "------"} </td>
        </tr>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Format </th>
          <td class="px-6 py-4"> {$formatStore || "------"} </td>
        </tr>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Transform </th>
          <td class="px-6 py-4"> type: {$transformTypeStore} <br /> {JSON.stringify($aliasesStore) || "------"} </td>
        </tr>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Type </th>
          <td class="px-6 py-4"> {$dataTypeStore || "------"} </td>
        </tr>
        <tr class={tableRow}>
          <th scope="row" class={tableHead}> Files </th>
          <td class="px-6 py-4">
            {comma($filesStore.map((f) => f.lines).reduce((a, b) => a + b, 0))} lines in
            {bytesHuman($filesStore.map((f) => f.size).reduce((a, b) => a + b, 0))}
            across {$filesStore.length} file{$filesStore.length != 1 ? "s" : ""}
            <br />
            <span class="italic">{truncate($filesStore.map((f) => f.name).join(", "), 400)}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<button
  class="btn_go"
  on:click={async () => {
    const job = await handleUpload();
    jobResult = cullResults(job.results);
    console.log(job);
  }}>🚀 Fire the Missiles!</button
>

{#if jobResult}
  <div class="title ml-6 pt-4 text-mpGray">Results</div>
  <div class="w-2/3">
    <div class="bg-white shadow-md rounded my-6">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <!-- Generate table headers -->

            {#each Object.keys(jobResult[0]) as key}
              <th class="py-3 px-6 text-left">{key}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <!-- Generate table rows -->
          {#each jobResult as item (item.id)}
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <!-- Generate table cells -->
              {#each Object.values(item) as value}
                <td class="py-3 px-6 text-left whitespace-nowrap">{value}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}

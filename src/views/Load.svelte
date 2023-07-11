<script>
  import {
    token as tokenStore,
    secret as secretStore,
    region as regionStore,
    format as formatStore,
    files as filesStore,
    dataType as dataTypeStore,
	aliases as aliasesStore
  } from "../store.js";
  import Project from "./components/Project.svelte";
  import { truncate, comma, bytesHuman } from "ak-tools";
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
			<td class="px-6 py-4"> {JSON.stringify($aliasesStore) || "------"} </td>
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

  <button class="btn_go" on:click={() => {}}>🚀 Fire the Missiles!</button>
</div>

<script>
  import { dataSnippet, dataType, aliases, transformType } from "../store.js";
  import { sample } from "../utils.js";
  import Simple from "./components/Simple.svelte";
  import { clone } from "ak-tools";
  let sourceData = [];
  let destData = [];
  let refreshEl;

  function loadSample() {
    if ($dataSnippet.data && $dataSnippet.data.length) {
      sourceData = sample($dataSnippet.data, 10);
      try {
        destData = transformer(sourceData, transformType, $aliases, $dataType);
      } catch (e) {
        destData = Array(10).fill({});
      }
    } else {
      sourceData = ["no data"];
    }
    if (refreshEl) {
      refreshEl.blur();
    }
  }

  $: if ($aliases) {
    refresh();
  }
  function refresh() {
    try {
      destData = transformer(sourceData, transformType, $aliases, $dataType);
    } catch (e) {
      destData = Array(10).fill({});
    }
  }

  loadSample();

  function transformer(sourceData, transformType, transformInfos, recordType) {
    if (sourceData[0] === "no data") {
	  return sourceData;
	}
	let template;
    let data;
    switch (recordType) {
      case "event":
        template = eventTemplate;
        break;
      case "user":
        template = userTemplate;
        break;
      case "group":
        template = groupTemplate;
        break;
      default:
        template = eventTemplate;
        break;
    }

    switch (transformType) {
      case "simple":
        return simpleTransform(sourceData, transformInfos, template);
        break;
      case "advanced":
        break;
      case "amplitude":
        break;
      case "none":
        return sourceData;
        break;
      default:
        return simpleTransform(sourceData, transformInfos, template);
        break;
    }
    return data;
  }

  function simpleTransform(sourceData, transformInfos, template) {
    const fieldAliases = clone(transformInfos);
    const data = sourceData.map((row) => {
      const newRow = { ...template };
      //aliased keys
      for (const [key, value] of Object.entries(fieldAliases)) {
        if ($dataType === "event" && key === "event") {
          newRow[key] = row[value];
        } else if ($dataType === "user" && key === "distinct_id") {
          newRow["$distinct_id"] = row[value];
        } else if ($dataType === "group" && key === "group_key") {
          newRow["$group_key"] = row[value];
        } else if ($dataType === "group" && key === "group_id") {
          newRow["$group_id"] = row[value];
        } else {
          if (template.properties) {
            newRow.properties[key] = row[value];
          }
          if (template.$set) {
            newRow.$set[key] = row[value];
          }
        }
      }

      //other keys
      for (const [key, value] of Object.entries(row)) {
        if (template.properties) {
          newRow.properties[key] = value;
        }
        if (template.$set) {
          newRow.$set[key] = value;
        }
      }
      return newRow;
    });

    return data;
  }
  const eventTemplate = {
    event: "",
    properties: {
      distinct_id: "",
      time: 0,
      $insert_id: null,
    },
  };

  const userTemplate = {
    $distinct_id: "",
    $set: {},
  };

  const groupTemplate = {
    $group_key: "",
    $group_id: "",
    $set: {},
  };

  const selector = `select w-full max-w-xs bg-white border-white text-mpGray select w-full max-w-xs bg-white border-white text-mpGray`;
</script>

<div class="title ml-6 pt-4 text-mpGray">Field Mappings</div>
<div class="ml-6 flex flex-row">
  <div class="py-5 flex flex-col space-y-4 w-1/2">
	<label for="transformType">Transform Type</label>
    <select id="transformType" class={selector} bind:value={$transformType} on:change={refresh}>
      <option disabled selected value="">Transform Type</option>
      <option value="simple">simple</option>
      <option value="advanced">advanced</option>
      <option value="none">none</option>
      <option value="amplitude">amplitude</option>
    </select>
	<label for="recordType">Record Type</label>
    <select id="recordType" class={selector} bind:value={$dataType} on:change={refresh}>
      <option disabled selected value="">Data Type</option>
      <option value="event">🚀 events</option>
      <option value="user">👥 user profiles</option>
      <option value="group">🏢 group profiles</option>
    </select>
  </div>
  <div class="py-5 flex flex-col space-y-4 w-1/2">
    {#if $transformType === 'simple'}
	<Simple data={sourceData} />
	{/if}
	{#if $transformType === 'advanced'}
	<!-- todo -->
	{/if}
	{#if $transformType === 'amplitude'}
	<!-- todo -->
	{/if}
	{#if $transformType === 'none'}
	<!-- todo -->
	{/if}
  </div>
</div>

<div class="flex ml-6 mr-6 flex-row pt-10 space-x-20 pb-10">
  <div class="flex flex-col space-y-3 w-1/2">
    <h1>Raw Data <button bind:this={refreshEl} on:click={loadSample} class="opacity-50 hover:opacity-100 focus:invert">🔄</button></h1>
    <div class="mockup-code overflow-y-auto h-[420px]">
      {#each sourceData as record}
        {#each JSON.stringify(record, null, 2).split("\n") as line}
          <pre><code class="text-xs">{line}</code></pre>
        {/each}
        <!-- <pre class="before:mr-0"><code class="text-xs">{JSON.stringify(line,null,2)}</code></pre> -->
      {/each}
    </div>
  </div>
  <div class="flex flex-col space-y-3 w-1/2">
    <h1>Transformed Data</h1>
    <div class="mockup-code overflow-y-auto h-[420px]">
      {#each destData as record}
        {#each JSON.stringify(record, null, 2).split("\n") as line}
          <pre><code class="text-xs">{line}</code></pre>
        {/each}
        <!-- <pre class="before:mr-0"><code class="text-xs">{JSON.stringify(line,null,2)}</code></pre> -->
      {/each}
    </div>
  </div>
</div>

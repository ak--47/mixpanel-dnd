<script>
  import { dataSnippet, dataType, aliases, transformType, currentFile } from "../store.js";
  import { sample } from "../utils.js";
  import Simple from "./components/Simple.svelte";
  import { clone } from "ak-tools";
  let sourceData = [];
  let destData = [];
  let rawDataEl;
  let transDataEl;
  let refreshEl;
  let hideShowEl;
  let showAll = false;
  var isSyncingLeftScroll = false;
  var isSyncingRightScroll = false;
  $: {
    if (rawDataEl && transDataEl) {
      rawDataEl.onscroll = function () {
        if (!isSyncingLeftScroll) {
          isSyncingRightScroll = true;
          transDataEl.scrollTop = rawDataEl.scrollTop;
        }
        isSyncingLeftScroll = false;
      };

      transDataEl.onscroll = function () {
        if (!isSyncingRightScroll) {
          isSyncingLeftScroll = true;
          rawDataEl.scrollTop = transDataEl.scrollTop;
        }
        isSyncingRightScroll = false;
      };
    }
  }

  // templates
  const eventTemplate = {
    event: "",
    properties: {
      distinct_id: null,
      time: 0,
      $insert_id: null,
    },
  };

  const userTemplate = {
    $distinct_id: null,
    $set: {},
  };

  const groupTemplate = {
    $group_key: null,
    $group_id: null,
    $set: {},
  };

  loadSample();

  $: {
    if ($aliases) {
      refresh();
    }
  }

  function refresh() {
    try {
      destData = transformer(sourceData, transformType, $aliases, $dataType);
    } catch (e) {
      destData = Array(10).fill({});
    }
  }

  function loadSample() {
    if ($dataSnippet.data && $dataSnippet.data.length) {
      sourceData = sample($dataSnippet.data, 10);
      try {
        destData = transformer(sourceData, $transformType, $aliases, $dataType);
      } catch (e) {
        destData = Array(10).fill({ error: e.message });
      }
    } else {
      sourceData = ["no data"];
      destData = ["no data"];
    }
    if (refreshEl) {
      refreshEl.blur();
    }
  }
  function transformer(sourceData, transformType, transformInfos, recordType) {
    if (sourceData[0] === "no data") {
      return sourceData;
    }
    let template;
    switch (recordType) {
      case "event":
        template = clone(eventTemplate);
        break;
      case "user":
        template = clone(userTemplate);
        break;
      case "group":
        template = clone(groupTemplate);
        break;
      default:
        template = clone(eventTemplate);
        break;
    }

    switch (transformType) {
      case "simple":
        return simpleTransform(sourceData, transformInfos, template);
      case "advanced":
        return [template];
      case "amplitude":
        return [template];
      case "none":
        return sourceData;
      default:
        return simpleTransform(sourceData, transformInfos, template);
    }
  }

  function simpleTransform(sourceData, transformInfos, template) {
    const fieldAliases = clone(transformInfos);
    const data = sourceData.map((row) => {
      const rowCopy = clone(row);
      const newRow = { ...template };

      //aliased keys
      for (const [key, value] of Object.entries(fieldAliases)) {
        if (value) {
          if ($dataType === "event" && key === "event") {
            if (row[value]) {
              newRow[key] = row[value];
              delete rowCopy[value];
            } else {
              //hardcoded event names
              newRow[key] = value;
            }
          } else if ($dataType === "user" && key === "distinct_id") {
            newRow["$distinct_id"] = row[value];
            delete rowCopy[value];
          } else if ($dataType === "group" && key === "group_key") {
            //hardcoded event group keys
            newRow[key] = value;
          } else if ($dataType === "group" && key === "group_id") {
            newRow["$group_id"] = row[value];
            delete rowCopy[value];
          } else if ($dataType === "event" && key === "insert_id") {
            newRow.properties["$insert_id"] = row[value];
            delete rowCopy[value];
          } else {
            if (template.properties) {
              newRow.properties[key] = row[value];
              delete rowCopy[value];
            }
            if (template.$set) {
              newRow.$set[key] = row[value];
              delete rowCopy[value];
            }
          }
        }
      }

      //other keys
      if (showAll) {
        for (const [key, value] of Object.entries(rowCopy)) {
          if (template.properties) {
            newRow.properties[key] = value;
          }
          if (template.$set) {
            newRow.$set[key] = value;
          }
        }
      }
      return newRow;
    });

    return data;
  }

  const selector = `select w-full max-w-xs bg-white border-white text-mpGray select w-full max-w-xs bg-white border-white text-mpGray`;
</script>

<div class="title ml-6 pt-4 text-mpGray">Field Mappings</div>
<div class="ml-6 flex flex-row">
  <div class="py-5 flex flex-col space-y-4 w-1/2">
    <label for="transformType">Transform Type</label>
    <select id="transformType" class={selector} bind:value={$transformType} on:change={loadSample}>
      <option disabled selected value="">Transform Type</option>
      <option value="simple">simple</option>
      <option value="advanced">advanced</option>
      <option value="none">none</option>
      <option value="amplitude">amplitude</option>
    </select>
    <label for="recordType">Record Type</label>
    <select id="recordType" class={selector} bind:value={$dataType} on:change={loadSample}>
      <option disabled selected value="">Data Type</option>
      <option value="event">🚀 events</option>
      <option value="user">👥 user profiles</option>
      <option value="group">🏢 group profiles</option>
    </select>
  </div>
  <div class="py-5 flex flex-col space-y-4 w-1/2">
    {#if $transformType === "simple"}
      <Simple data={sourceData} />
    {/if}
    {#if $transformType === "advanced"}
      <!-- todo -->
    {/if}
    {#if $transformType === "amplitude"}
      <!-- todo -->
    {/if}
    {#if $transformType === "none"}
      <!-- todo -->
    {/if}
  </div>
</div>

<div class="flex ml-6 mr-6 flex-row pt-5 space-x-20 pb-10">
  <!-- RAW -->
  <div class="flex flex-col space-y-3 w-1/2">
    <h1 class="text-mpGray text-lg">
      Raw Data
      <span>
        <button bind:this={refreshEl} on:click={loadSample} class="opacity-50 hover:opacity-100 ml-2 focus:invert">🔄</button>
      </span>
      <span class="ml-10 text-mpOrange opacity-75">{$currentFile}</span>
    </h1>
    <div class="mockup-code overflow-y-auto h-[420px]" bind:this={rawDataEl}>
      {#each sourceData as record}
        {#each JSON.stringify(record, null, 2).split("\n") as line}
          <pre><code class="text-xs">{line}</code></pre>
        {/each}
      {/each}
    </div>
  </div>

  <!-- TRANSFORMED -->
  <div class="flex flex-col space-y-3 w-1/2">
    <h1 class="text-mpGray text-lg">
      Transformed Data
      <span>
        <button
          bind:this={hideShowEl}
          on:click={() => {
            showAll = !showAll;
            refresh();
          }}
          class="opacity-50 hover:opacity-100 focus:invert ml-2">👀</button
        >
      </span>
    </h1>
    <div class="mockup-code overflow-y-auto h-[420px]" bind:this={transDataEl}>
      {#each destData as record}
        {#each JSON.stringify(record, null, 2).split("\n") as line}
          <pre><code class="text-xs">{line}</code></pre>
        {/each}
        <!-- <pre class="before:mr-0"><code class="text-xs">{JSON.stringify(line,null,2)}</code></pre> -->
      {/each}
    </div>
  </div>
</div>

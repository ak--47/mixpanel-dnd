<script>
  import { dataSnippet, dataType } from "../store.js";
  import { sample } from "../utils.js";
  import Simple from "./components/Simple.svelte";
  let sourceData = [];
  let destData = [];
  let transformType;
  let transformData;
  let refreshEl;

  function loadSample() {
    if ($dataSnippet.data && $dataSnippet.data.length) {
      sourceData = sample($dataSnippet.data, 10);
      try {
        destData = transformer(sourceData, transformType, transformData, $dataType);
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

  loadSample();

  function transformer(sourceData, transformType, transformInfos, recordType) {
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
        throw new Error("invalid record type");
    }

    switch (transformType) {
      case "simple":
        break;
      case "advanced":
        break;
      case "amplitude":
        break;
      case "none":
        return sourceData;
        break;
      default:
        throw new Error("invalid transform type");
        break;
    }

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
<div class="flex flex-row">
  <div class="py-5 flex flex-col space-y-4 w-1/2">
    <select class={selector} bind:value={transformType}>
      <option disabled selected value="">Transform Type</option>
      <option value="simple">simple</option>
      <option value="advanced">advanced</option>
      <option value="none">none</option>
      <option value="amplitude">amplitude</option>
    </select>
    <select class={selector} bind:value={$dataType}>
      <option disabled selected value="">Data Type</option>
      <option value="event">🚀 events</option>
      <option value="user">👥 user profiles</option>
      <option value="group">🏢 group profiles</option>
    </select>
  </div>
  <div class="py-5 flex flex-col space-y-4 w-1/2">
    <Simple data={sourceData}/>
  </div>
</div>

<div class="flex ml-6 mr-6 flex-row pt-10 space-x-20 pb-20">
  <div class="flex flex-col space-y-3 w-1/2">
    <h1>Raw Data <button bind:this={refreshEl} on:click={loadSample} class="opacity-50 hover:opacity-100 focus:invert">🔄</button></h1>
    <div class="mockup-code">
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
    <div class="mockup-code">
      {#each destData as record}
        {#each JSON.stringify(record, null, 2).split("\n") as line}
          <pre><code class="text-xs">{line}</code></pre>
        {/each}
        <!-- <pre class="before:mr-0"><code class="text-xs">{JSON.stringify(line,null,2)}</code></pre> -->
      {/each}
    </div>
  </div>
</div>

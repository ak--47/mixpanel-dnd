<script>
  import { dataType, aliases } from "../../store.js";
  export let data;
  let customInput = false; //todo: remember last value
    //oops, this is a bit of a mess
  let eventNameAlias = $aliases?.event || "";
  let distinctIdAlias = $aliases?.distinct_id || "";
  let timeAlias = $aliases?.time || "";
  let insertIdAlias = $aliases?.insert_id || "";
  let nameAlias = $aliases?.name || "";
  let emailAlias = $aliases?.email || "";
  let createdAtAlias = $aliases?.createdAt || "";
  let groupIdAlias = $aliases?.groupId || "";
  let groupKeyAlias = $aliases?.groupKey || "";
  let colHeaders = [];
  if (data && data[0] !== "no data") {
    colHeaders = Array.from(new Set(data.map(Object.keys).flat()));
  }

  // when any dropdown is selected, update mappings
  $: {
    if (eventNameAlias || distinctIdAlias || timeAlias || insertIdAlias || nameAlias || emailAlias || createdAtAlias || groupIdAlias || groupKeyAlias) {
      aliases.set(getMappings());
    }
  }

  function getMappings() {
    const obj = {};
    if ($dataType === "event") {
      obj.event = eventNameAlias || "";
      obj.distinct_id = distinctIdAlias || "";
      obj.time = timeAlias || "";
      obj.insert_id = insertIdAlias || "";
    }
    if ($dataType === "user") {
      obj.distinct_id = distinctIdAlias || "";
      obj.name = nameAlias || "";
      obj.email = emailAlias || "";
      obj.created_at = createdAtAlias || "";
    }
    if ($dataType === "group") {
      obj.name = nameAlias || "";
      obj.email = emailAlias || "";
      obj.group_id = groupIdAlias || "";
      obj.group_key = groupKeyAlias || "";
    } else {
      obj.event = eventNameAlias || "";
      obj.distinct_id = distinctIdAlias || "";
      obj.time = timeAlias || "";
      obj.insert_id = insertIdAlias || "";
    }

    return obj;
  }

  const selector = `select w-full max-w-xs bg-white border-white text-mpGray opacity-50`;
  const writeIn = `input w-full max-w-xs bg-white text-mpPurple text-sm text-mpPurple`;
  const labels = `block w-[20vw]`;
</script>

{#if $dataType === "event"}
  <div id="events">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4 basis-1/2">
        <div>
          <label class={labels} for="eventName"
            >Event Name Field <button
              on:click={() => {
                customInput = !customInput;
              }}>✏️</button
            ></label
          >
          {#if customInput}
            <input id="eventName" bind:value={eventNameAlias} placeholder="write a value" class={writeIn} required />
          {:else}
            <select id="eventName" bind:value={eventNameAlias} class={selector} required>
              <option disabled selected value="">event name</option>
              {#each colHeaders as header}
                <option value={header}>{header}</option>
              {/each}
            </select>
          {/if}
        </div>

        <div>
          <label class={labels} for="distinctId">Distinct Id Field</label>
          <select id="distinctId" bind:value={distinctIdAlias} class={selector} required>
            <option disabled selected value="">distinct_id</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-row space-x-4 basis-1/2">
        <div>
          <label class={labels} for="time">Time Field</label>
          <select id="time" bind:value={timeAlias} class={selector} required>
            <option disabled selected value="">time</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class={labels} for="insertId">Insert Id Field</label>
          <select id="insertId" bind:value={insertIdAlias} class={selector}>
            <option disabled selected value="">$insert_id</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if $dataType === "user"}
  <div id="user">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <div>
          <label class={labels} for="distinctId">Distinct Id Field</label>
          <select id="distinctId" bind:value={distinctIdAlias} class={selector} required>
            <option disabled selected value="">$distinct_id</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class={labels} for="createdAt">Created At Field</label>
          <select id="createdAt" bind:value={createdAtAlias} class={selector}>
            <option disabled selected value="">$created</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-row space-x-4">
        <div>
          <label class={labels} for="name">Name Field</label>
          <select id="name" bind:value={nameAlias} class={selector}>
            <option disabled selected value="">$name</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class={labels} for="email">Email Field</label>
          <select id="email" bind:value={emailAlias} class={selector}>
            <option disabled selected value="">$email</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if $dataType === "group"}
  <div id="group">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <div>
          <label class={labels} for="groupKey">Group Key Field</label>
          <input id="groupKey" bind:value={groupKeyAlias} placeholder="write a value" class={writeIn} required />
        </div>

        <div>
          <label class={labels} for="groupId">Group Id Field</label>
          <select id="groupId" bind:value={groupIdAlias} class={selector} required>
            <option disabled selected value="">$group_id</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-row space-x-4">
        <div>
          <label class={labels} for="name">Name Field</label>
          <select id="name" bind:value={nameAlias} class={selector}>
            <option disabled selected value="">$name</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label class={labels} for="email">Email Field</label>
          <select id="email" bind:value={emailAlias} class={selector}>
            <option disabled selected value="">$email</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  select:required {
    opacity: 1;
    border: "green";
  }
</style>

<script>
  // todo: publish to parent
  // ? https://svelte.dev/repl/24adfb0a93734265952e2870155aeb49?version=3.43.1
  import { dataSnippet, dataType, aliases } from "../../store.js";
  import { cleanObj } from "ak-tools";
  const selector = `select w-full max-w-xs bg-white border-white text-mpGray select w-full max-w-xs bg-white border-white text-mpGray opacity-50`;
  export let data;
  let eventNameEl;
  let eventNameAlias;
  let distinctIdEl;
  let distinctIdAlias;
  let timeEl;
  let timeAlias;
  let insertIdEl;
  let insertIdAlias;
  let nameEl;
  let nameAlias;
  let emailEl;
  let emailAlias;
  let createdAtEl;
  let createdAtAlias;
  let groupIdEl;
  let groupIdAlias;
  let groupKeyEl;
  let groupKeyAlias;
  let colHeaders = [];
  //oops, this is a bit of a mess
  if (data && data[0] !== "no data") {
    colHeaders = Array.from(new Set(data.map(Object.keys).flat()));
  }

  $: aliases.set(getMappings());
  $: if (eventNameAlias || distinctIdAlias || timeAlias || insertIdAlias || nameAlias || emailAlias || createdAtAlias || groupIdAlias || groupKeyAlias) {
    aliases.set(getMappings());
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
</script>

{#if $dataType === "event"}
  <div id="events">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <div>
          <label for="eventName" class="relative">Event Name Field</label>
          <select id="eventName" bind:value={eventNameAlias} bind:this={eventNameEl} class={selector} required>
            <option disabled selected value="">event name field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="distinctId">Distinct Id Field</label>
          <select id="distinctId" bind:value={distinctIdAlias} bind:this={distinctIdEl} class={selector} required>
            <option disabled selected value="">distinct_id field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>

      <div class="flex flex-row space-x-4">
        <div>
          <label for="time">Time Field</label>
          <select id="time" bind:value={timeAlias} bind:this={timeEl} class={selector} required>
            <option disabled selected value="">time name field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="insertId">Insert Id Field</label>
          <select id="insertId" bind:value={insertIdAlias} bind:this={insertIdEl} class={selector}>
            <option disabled selected value="">$insert_id field</option>
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
          <label for="distinctId">Distinct Id Field</label>
          <select id="distinctId" bind:value={distinctIdAlias} bind:this={distinctIdEl} class={selector} required>
            <option disabled selected value="">$distinct_id field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="createdAt">Created At Field</label>
          <select id="createdAt" bind:value={createdAtAlias} bind:this={createdAtEl} class={selector}>
            <option disabled selected value="">$created field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-row space-x-4">
        <div>
          <label for="name">Name Field</label>
          <select id="name" bind:value={nameAlias} bind:this={nameEl} class={selector}>
            <option disabled selected value="">$name field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="email">Email Field</label>
          <select id="email" bind:value={emailAlias} bind:this={emailEl} class={selector}>
            <option disabled selected value="">$email field</option>
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
          <label for="groupKey">Group Key Field</label>
          <select id="groupKey" bind:value={groupKeyAlias} bind:this={groupKeyEl} class={selector} required>
            <option disabled selected value="">$group_key field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="groupId">Group Id Field</label>
          <select id="groupId" bind:value={groupIdAlias} bind:this={groupIdEl} class={selector} required>
            <option disabled selected value="">$group_id field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="flex flex-row space-x-4">
        <div>
          <label for="name">Name Field</label>
          <select id="name" bind:value={nameAlias} bind:this={nameEl} class={selector}>
            <option disabled selected value="">$name field</option>
            {#each colHeaders as header}
              <option value={header}>{header}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="email">Email Field</label>
          <select id="email" bind:value={emailAlias} bind:this={emailEl} class={selector}>
            <option disabled selected value="">$email field</option>
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
  }
</style>

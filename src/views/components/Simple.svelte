<script>
  import { dataSnippet, dataType } from "../../store.js";
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
</script>

{#if $dataType === "event"}
  <div id="events">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <select bind:value={eventNameAlias} bind:this={eventNameEl} class={selector} required>
          <option disabled selected value="">event name field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>

        <select bind:value={distinctIdAlias} bind:this={distinctIdEl} class={selector} required>
          <option disabled selected value="">distinct_id field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-row space-x-4">
        <select bind:value={timeAlias} bind:this={timeEl} class={selector} required>
          <option disabled selected value="">time name field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>

        <select bind:value={insertIdAlias} bind:this={insertIdEl} class={selector}>
          <option disabled selected value="">$insert_id field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{/if}

{#if $dataType === "user"}
  <div id="user">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <select bind:value={distinctIdAlias} bind:this={distinctIdEl} class={selector} required>
          <option disabled selected value="">$distinct_id field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
        <select bind:value={createdAtAlias} bind:this={createdAtEl} class={selector}>
          <option disabled selected value="">$created field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-row space-x-4">
        <select bind:value={nameAlias} bind:this={nameEl} class={selector}>
          <option disabled selected value="">$name field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>

        <select bind:value={emailAlias} bind:this={emailEl} class={selector}>
          <option disabled selected value="">$email field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{/if}

{#if $dataType === "group"}
  <div id="group">
    <div class="flex flex-col space-y-4 ml-10 mr-10">
      <div class="flex flex-row space-x-4">
        <select bind:value={groupKeyAlias} bind:this={groupKeyEl} class={selector} required>
          <option disabled selected value="">$group_key field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
        <select bind:value={groupIdAlias} bind:this={groupIdEl} class={selector} required>
          <option disabled selected value="">$group_id field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-row space-x-4">
        <select bind:value={nameAlias} bind:this={nameEl} class={selector}>
          <option disabled selected value="">$name field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>

        <select bind:value={emailAlias} bind:this={emailEl} class={selector}>
          <option disabled selected value="">$email field</option>
          {#each colHeaders as header}
            <option value={header}>{header}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{/if}

<style>
  select:required {
    opacity: 1;
  }
</style>

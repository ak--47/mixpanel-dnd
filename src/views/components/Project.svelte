<script>
  import { token, secret, region, dataType } from "../../store.js";
  import { onMount } from "svelte";

  let status = ``;

  onMount(() => {
    getCreds();
  });

  async function verifyCreds() {
    if ($token === "" || $secret === "") {
      status = `please enter a project token AND secret`;
    } else {
      status = `verifying...`;
      const creds = { token: $token, secret: $secret, region: $region };
      try {
        const req = await fetch("/verify", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          // @ts-ignore ... but why??
          body: JSON.stringify(creds),
        });
        const res = await req.json();
        status = res.status;
        saveCreds();
      } catch (e) {
        status = `SERVER ERROR:\n${e}`;
      }
    }
  }

  function saveCreds() {
    //save to localStorage
    localStorage.setItem("token", $token);
    localStorage.setItem("secret", $secret);
    // localStorage.setItem("region", $region);
    // localStorage.setItem("dataType", $dataType);
  }

  function getCreds() {
    //check if creds are in localStorage
    if (localStorage.getItem("token")) $token = localStorage.getItem("token");
    if (localStorage.getItem("secret")) $secret = localStorage.getItem("secret");
    // if (localStorage.getItem("region")) $region = localStorage.getItem("region");
    // if (localStorage.getItem("dataType")) $dataType = localStorage.getItem("dataType");
  }

  function resetCreds() {
    $token = "";
    $secret = "";
    //clear from localStorage
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("secret");
    } catch (e) {}
  }

  const inputFieldStyles = `input w-full max-w-xs bg-white text-mpPurple text-sm`;
</script>

<div class="title ml-6 pt-4 text-mpGray">Project Info</div>
<div class="ml-6 flex flex-row space-x-10 mt-5" id="project">
  <div class="flex flex-col space-y-2 w-1/5">
	<label for="token">token</label>
    <input type="text" id="token" bind:value={$token} placeholder="project token" class={inputFieldStyles} />
	<label for="secret">secret</label>
    <input type="text" id="sceret" bind:value={$secret} placeholder="project secret" class={inputFieldStyles} />
  </div>
  <div class="flex flex-col space-y-2 w-1/6">
	<label for="residency">Data Residency</label>
    <select id="residency" class="select w-full max-w-xs bg-white border-white text-mpGray" bind:value={$region}>
      <option disabled selected value="">Data Residency</option>
      <option value="US">🇺🇸 United States</option>
      <option value="EU">🇪🇺 European Union</option>
    </select>
	<label for="type">Record Type</label>
    <select id="type" class="select w-full max-w-xs bg-white border-white text-mpGray" bind:value={$dataType}>
      <option disabled selected value="">Data Type</option>
      <option value="event">🚀 events</option>
      <option value="user">👥 user profiles</option>
      <option value="group">🏢 group profiles</option>
    </select>
  </div>
</div>

<div class="ml-6 flex flex-row space-x-2 mt-5">
  <button class="btn_go" on:click={verifyCreds}>Verify</button>
  <button class="btn_clear" on:click={resetCreds}>Clear</button>
</div>

<p id="status" class="mt-3 ml-6">{status}</p>

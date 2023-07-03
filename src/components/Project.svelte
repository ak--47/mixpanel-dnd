<script>
  import { token as tokenStore, secret as secretStore, region as regionStore } from "../store.js";
  export let token = "";
  export let secret = "";
  export let region = "US";
  let status = ``;

  function init() {
    getCreds();
  }

  async function verifyCreds() {
    if (token === "" || secret === "") {
      status = `please enter a project token AND secret`;
    } else {
      status = `verifying...`;
      const creds = { token, secret, region };
      try {
        const req = await fetch("/verify", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
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
    localStorage.setItem("token", token);
    localStorage.setItem("secret", secret);
    localStorage.setItem("region", region);
    //save to store
    tokenStore.set(token);
    secretStore.set(secret);
    regionStore.set(region);
  }

  function getCreds() {
    //check if creds are in localStorage
    if (localStorage.getItem("token")) token = localStorage.getItem("token");
    if (localStorage.getItem("secret")) secret = localStorage.getItem("secret");
    if (localStorage.getItem("region")) region = localStorage.getItem("region");
  }

  function resetCreds() {
    token = "";
    secret = "";
    //clear from localStorage
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("secret");
    } catch (e) {}
  }

  const inputFieldStyles = `input w-full max-w-xs bg-white text-mpPurple text-sm`;

  init();
</script>

<div class="title ml-6 pt-4 text-mpGray">Project Info</div>
<div class="flex justify-center flex-col p-10 space-y-4" id="project">
  <input type="text" id="token" bind:value={token} placeholder="project token" class={inputFieldStyles} />
  <input type="text" id="sceret" bind:value={secret} placeholder="project secret" class={inputFieldStyles} />
  <select class="select w-full max-w-xs bg-white border-white" bind:value={region}>
    <option disabled selected>Data Residency</option>
    <option value="US">🇺🇸 United States</option>
    <option value="EU">🇪🇺 European Union</option>
  </select>
  <div class="flex flex-row space-x-4">
    <button class="rounded-lg btn btn-primary w-fit bg-mpPurple border-mpPurple" on:click={verifyCreds}>Verify</button>
    <button class="rounded-lg btn btn-secondary w-fit bg-mpGray border-mpGray hover:bg-mpRed hover:border-mpRed" on:click={resetCreds}>Clear</button>
  </div>

  <p id="status">{status}</p>
</div>

<script>
  import MpIcon from "../assets/svg/MpIcon.svelte";
  import MpHelp from "../assets/svg/MpHelp.svelte";
  import MpHeart from "../assets/svg/MpHeart.svelte";
  import { view } from "../store.js";

  function setView(e) {
    const viewName = e.target.parentElement.id.toLowerCase();
	e.target.setAttribute("current", true)
    view.set(viewName);
  }

  const navItemStyle = `block py-2 pl-4 pr-4 text-mpWhite hover:text-mpOrange p-0 pixelPerfNavItem active:text-mpRed`;
</script>

<nav class="bg-mpPurple relative w-full z-20 top-0 left-0 border-b border-gray-600 mp">
  <div class="max-w-screen flex flex-wrap p-2.5">
    <a href={"#"} class="flex items-center">
      <div class="container ml-2">
        <MpIcon width="25" height="25" />
      </div>
    </a>

    <ul class="flex flex-row ml-4 items-start">
      <li id="extract">
        <a href={"#"} class={navItemStyle} on:click={setView}>Extract</a>
      </li>

      <li id="transform">
        <a href={"#"} class={navItemStyle} on:click={setView}>Transform</a>
      </li>
      <li id="load">
        <a href={"#"} class={navItemStyle} on:click={setView}>Load</a>
      </li>
    </ul>
    <!-- <div class="inline-flex relative ml-1/2 flex-nowrap items-center opacity-50 hover:opacity-100 hover:text-mpOrange">
      <MpHeart />
    </div> -->
    <a href={"https://www.youtube.com/watch?v=a3Z7zEc7AXQ"} class="inline-flex flex-nowrap ml-auto pr-10 items-center opacity-50 hover:opacity-100">
      <MpHelp />
    </a>
  </div>
</nav>

<style>
  .pixelPerfNavItem {
    font-family: "Apercu Pro", "Helvetica Neue", Helvetica, Tahoma, Geneva, Arial, sans-serif;
    font-feature-settings: normal;
    font-kerning: auto;
    font-optical-sizing: auto;
    font-size: 14px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-alternates: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: none;
    font-variant-numeric: normal;
    font-variation-settings: normal;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }
</style>

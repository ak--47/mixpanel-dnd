<script>
  import Ping from "./components/Ping.svelte";

  //   VIEWS
  import Nav from "./components/Nav.svelte";
  import Project from "./components/Project.svelte";
  import Upload from "./components/Upload.svelte";
  import Transform from "./components/Transform.svelte";
  import Load from "./components/Load.svelte";
  import { view } from "./store.js";

  let currentView = "project";

  //   simple view router
  view.subscribe((value) => (currentView = value));
</script>

<link href="/apercu-bold-pro.woff2" rel="stylesheet" />

<main class="container mx-auto bg-mpWhite">
  <!-- SERVICE COMPONENTS -->
  <Ping />

  <!-- NAV -->
  <Nav />

  <!-- CANVAS -->
  <!-- ? https://svelte.dev/tutorial/writable-stores -->
  <div class="container block bg-mpWhite mx-auto h-screen ml-14">
    {#if currentView === "project"}
      <Project />
    {/if}
    {#if currentView === "upload"}
      <Upload />
    {/if}
    {#if currentView === "transform"}
      <Transform />
    {/if}
    {#if currentView === "load"}
      <Load />
    {/if}
  </div>

  <!-- SIDEBAR -->
  <!-- <Sidebar /> -->

  <!-- <div class="container mx-auto p-20 mt-10 bg-slate-500">
    <p>i am content</p>
  </div> -->
</main>

<style>
</style>

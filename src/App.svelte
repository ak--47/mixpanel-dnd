<script>
  // COMPONENTS
  import Ping from "./views/components/Ping.svelte";
  import Nav from "./views/Nav.svelte";
  import Extract from "./views/Extract.svelte";
  import Transform from "./views/Transform.svelte";
  import Load from "./views/Load.svelte";
  import { view } from "./store.js";

  let viewOrder = ["extract", "transform", "load"];

  // ROUTER
  let currentView;
  view.subscribe((value) => {
    if (value) {
      currentView = value;
      localStorage.setItem("lastView", value);
    }
  });

  if (localStorage.getItem("lastView")) {
    currentView = localStorage.getItem("lastView");
  } else {
    currentView = "extract";
  }

  //methods
  function forward() {
    let currentIndex = viewOrder.indexOf(currentView);
    if (currentIndex < viewOrder.length - 1) {
      view.set(viewOrder[currentIndex + 1]);
      currentView = viewOrder[currentIndex + 1];
    }
  }

  function back() {
    let currentIndex = viewOrder.indexOf(currentView);
    if (currentIndex > 0) {
      view.set(viewOrder[currentIndex - 1]);
      currentView = viewOrder[currentIndex - 1];
    }
  }
</script>

<link href="/apercu-bold-pro.woff2" rel="stylesheet" />

<main class="container mx-auto bg-mpWhite max-h-screen">
  <!-- SERVICE COMPONENTS -->
  <Ping />

  <!-- NAV -->
  <Nav />

  <!-- CANVAS -->
  <!-- ? https://svelte.dev/tutorial/writable-stores -->
  <div class="container block bg-mpWhite mx-auto ml-14">
    {#if currentView === "extract"}
      <Extract />
    {/if}
    {#if currentView === "transform"}
      <Transform />
    {/if}
    {#if currentView === "load"}
      <Load />
    {/if}
    <div id="controls" class="relative mb-5">
      <div class="absolute top-0 right-20">
        <button class="btn bg-mpWhite border-none text-base px-2 py-2 ml-6" on:click={back}>←</button>
        <button class="btn bg-mpWhite border-none text-base px-2 py-2" on:click={forward}>→</button>
      </div>
    </div>
  </div>
</main>

<style>
</style>

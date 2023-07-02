<script>
  import MpIcon from "../assets/svg/MpIcon.svelte";
</script>

<nav
  class="bg-mpPurple fixed w-full z-20 top-0 left-0 border-b border-gray-600"
>
  <div class="max-w-screen-xl flex flex-wrap p-2.5">
    <a href={"#"} class="flex items-center">
      <div class="container ml-2">
        <MpIcon width="25" height="25" />
      </div>
    </a>

    <ul class="flex flex-row ml-4 items-start">
      <li id="project">
        <a
          href={"#"}
          class="block py-2 pl-4 pr-4 text-mpWhite hover:text-mpOrange p-0 pixelPerfNavItem"
          >Project</a
        >
      </li>
      <li id="upload">
        <a
          href={"#"}
          class="block py-2 pl-4 pr-4 text-mpWhite hover:text-mpOrange p-0 pixelPerfNavItem"
          >Upload</a
        >
      </li>

      <li id="">
        <a
          href="transform"
          class="block py-2 pl-4 pr-4 text-mpWhite hover:text-mpOrange p-0 pixelPerfNavItem"
          >Transform</a
        >
      </li>
      <li id="load">
        <a
          href={"#"}
          class="block py-2 pl-4 pr-4 text-mpWhite hover:text-mpOrange p-0 pixelPerfNavItem"
          >Load</a
        >
      </li>
    </ul>
  </div>
</nav>

<style>
  .pixelPerfNavItem {
    font-family: "Apercu Pro", "Helvetica Neue", Helvetica, Tahoma, Geneva,
      Arial, sans-serif;
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

<script>
  // @ts-nocheck

  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  const controlsLayout = ["previousFrame", "playpause", "stop", "nextFrame", "progress", "frame", "loop", "spacer", "background", "snapshot", "zoom", "info"];
</script>

<LottiePlayer
  src="https://cdn.mxpnl.com/static/asset-cache/d8f0a14d77bc379dfe99/iron/common/components/spinner/limited-seg.lottie"
  autoplay={true}
  loop={true}
  controls={false}
  renderer="svg"
  background="transparent"
  height={"50%"}
  width={"50%"}  
  controlsLayout={controlsLayout}
/>

<template>
  <div class="container">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
$green_Spotify: #1db954;
.container {
  width: 100%;
  height: 100%;
}
.spinner {
  margin: auto;
  width: 50px;
  height: 50px;
  border: 5px solid;
  //   border-top-color: $green_Spotify;
  border-color: $green_Spotify transparent transparent;
  border-radius: 100px;
  animation: 2s infinite linear changepos;
}

@keyframes changepos {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

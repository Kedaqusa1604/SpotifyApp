<template>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { getToken } from "./api/getToken";

export default {
  setup() {
    onBeforeMount(() => {
      getToken().then((token) => {
        sessionStorage.setItem("token", token.access_token);
      });
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: "Jost";
  box-sizing: border-box;
}
</style>

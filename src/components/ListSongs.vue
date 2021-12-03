<template>
  <div class="listSongs">
    <template v-for="song in songs" :key="song.id">
      <Song :song="song" />
    </template>
  </div>
</template>

<script>
import Song from "./Song.vue";
export default {
  name: "ListSongs",
  props: {
    songs: Array,
  },
  components: {
    Song,
  },
};
</script>

<style lang="scss" scoped>
.listSongs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  // background: sienna;
  div {
    margin-bottom: 20px;
  }
}
</style>

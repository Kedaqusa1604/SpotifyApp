<template>
  <div class="listSongs">
    <template v-if="songs.length != 0">
      <template v-for="song in songs" :key="song.id">
        <Song :song="song" />
      </template>
    </template>
    <template v-else>
      <div class="error">
        <div class="error__image">
          <img src="../assets/fail.svg" />
        </div>
        <div class="error__text">
          <p>
            Vaya, no se ha encontrado ninguna canción con el nombre: "{{
              songName
            }}". Intenta con una nueva búsqueda
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Song from "./Song.vue";
import { getAsyncSongs } from "../api/getSongsList";
export default {
  name: "ListSongs",
  props: {
    songName: String,
  },
  components: {
    Song,
  },
  async setup(props) {
    let songName = document.cookie.substring(document.cookie.indexOf("=") + 1);
    let songs = await getAsyncSongs(songName);
    return {
      songs,
    };
  },
};
</script>

<style lang="scss" scoped>
.listSongs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  div {
    margin-bottom: 20px;
  }
}
.error {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
  &__image {
    width: 70%;
    img {
      width: 100%;
    }
  }
  &__text {
    width: 100%;
    text-align: center;
    color: rgba(#fff, 0.5);
  }
}
</style>

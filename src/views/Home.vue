<template>
  <div class="window">
    <div class="home">
      <div class="home__search">
        <p class="home__search_title">Busca una canción</p>
        <form class="home__search_inputs" @submit.prevent="searchSong">
          <input
            class="home__search_input"
            type="text"
            v-model="songName"
            placeholder="Introduce el nombre de una canción"
            :class="{ required: songName === '' }"
            required
          />
          <button class="home__search_button">
            <fa class="icon_Search" :icon="['fas', 'search']" /> Buscar
          </button>
        </form>
      </div>
      <template v-if="songs.length !== 0">
        <div class="home__list">
          <ListSongs :songs="songs" />
        </div>
      </template>
      <template v-else>
        <div class="errorMessage">
          <div class="errorMessage__image">
            <fa :icon="['fas', 'frown']" size="7x" />
            <fa :icon="['fas', 'times-circle']" size="3x" />
          </div>
          <div class="errorMessage__text">
            <p>
              Lo siento, no hemos encontrado resultados para tu búsqueda.
              Intenta con otra canción
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import ListSongs from "../components/ListSongs.vue";
export default {
  name: "Home",
  components: {},
  setup() {
    const store = useStore();
    let songs = computed(() => store.state.songs);
    let songName = ref("");
    onMounted(() => {
      store.dispatch("getSongs", {
        token: localStorage.getItem("token"),
        query: "a",
      });
    });

    const searchSong = () => {
      store.dispatch("getSongs", {
        token: localStorage.getItem("token"),
        query: songName.value,
      });
      songName.value = "";
    };
    return {
      store,
      songs,
      songName,
      searchSong,
    };
  },
  components: {
    ListSongs,
  },
};
</script>

<style lang="scss" scoped>
$background: hsl(60, 4%, 11%);
$green_Spotify: #1db954;
.window {
  width: 100%;
  min-height: 100vh;
  background: $background;
}
.home {
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 25px;
  &__search {
    padding: 0 20px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    &_title {
      font-weight: 600;
      font-size: 2em;
      color: #eeeeee;
      text-align: center;
    }
    &_inputs {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
    }

    &_button {
      background: $green_Spotify;
      width: 30%;
      max-width: 100px;
      outline: none;
      border: 1px solid #606061;
      border-radius: 0 5px 5px 0;
      font-size: 16px;
      color: #fefefe;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon_Search {
        margin-right: 10px;
      }
      &:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: inherit;
        background: transparent;
        transition: background-color 0.3s ease;
      }
      &:hover {
        cursor: pointer;
      }
      &:hover:before {
        background: rgba(0, 0, 0, 0.2);
      }
    }
    &_input {
      width: 70%;
      max-width: 400px;
      height: 35px;
      outline: none;
      border-radius: 5px 0 0 5px;
      border: 1px solid #606061;
      padding: 0 10px;
      font-size: 17px;
      background: #fefefe;
      transition: all 0.3s ease;
      &:focus {
        border-color: $green_Spotify;
        box-shadow: 0 0 7px $green_Spotify;
      }
      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.errorMessage {
  color: #464646;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__image {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  &__text {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
  }
}

//X-Small
@media screen and (max-width: 576px) {
  .home {
    &__search {
      font-size: 17px;
      &_inputs {
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
      }
      &_button,
      &_input {
        width: 100%;
        max-width: 400px;
        margin-top: 5px;
        border-radius: 5px;
      }
      &_button {
        height: 35px;
        margin-top: 10px;
      }
    }
  }
}
</style>

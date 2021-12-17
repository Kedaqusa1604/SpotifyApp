<template>
  <div class="window">
    <div class="about">
      <div class="about__description">
        <div class="about__description_image">
          <img :src="song.album.images[1].url" :alt="song.name" />
        </div>
        <div class="about__description_data">
          <p class="about__description_data-title" v-text="song.name"></p>
        </div>
        <a
          target="blank"
          :href="song.external_urls.spotify"
          class="about__description_listen"
        >
          <fa :icon="['fab', 'spotify']" /> Escuchar en Spotify</a
        >
      </div>
      <div class="about__info">
        <div class="about__info_artist" v-text="song.artists[0].name"></div>
        <div class="about__info_album" v-text="song.album.name"></div>
        <div class="about__info_other">
          <p>
            <strong>Fecha de lanzamiento: </strong
            >{{ formatDate(song.album.release_date) }}
          </p>

          <p>
            <strong>Duración: </strong
            >{{ formatDuration(song.duration_ms) + " min" }}
          </p>
          <p><strong>Popularidad: </strong>{{ song.popularity + "%" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("getSongSelected", {
        token: sessionStorage.getItem("token"),
        id_song: route.params.id,
      });
    });
    const route = useRoute();

    console.log(route.params.id);

    const song = computed(() => store.state.songSelected);
    const moreSongs = computed(() => store.state.songs);
    const formatDate = (date) => {
      return moment(date).format("dddd, MMMM Do YYYY");
    };
    const formatDuration = (duration) => {
      return moment("2000-01-01 00:00:00")
        .add(moment.duration(duration))
        .format("mm:ss");
    };
    return {
      route,
      store,
      song,
      moreSongs,
      formatDate,
      formatDuration,
    };
  },
};
</script>

<style lang="scss" scoped>
$background: #1d1d1b;
$green_Spotify: #1db954;
.window {
  width: 100%;
  min-height: 100vh;
  background: $background;
}
.about {
  width: 100%;
  min-height: 100vh;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 320px auto;
  grid-template-rows: 100%;
  position: relative;
  &__description {
    grid-column: 1/2;
    grid-row: 1/-1;
    // background: red;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &_image {
      width: 100%;
      img {
        width: 100%;
      }
    }
    &_data {
      margin: 20px 0;
      &-title {
        font-weight: 600;
        font-size: 30px;
        color: #eee;
        line-height: 35px;
      }
    }
    &_listen {
      display: flex;
      text-decoration: none;
      color: #eee;
      font-weight: 500;
      background: $green_Spotify;
      width: 200px;
      height: 40px;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 100px;
      align-self: center;

      position: relative;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: transparent;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        transition: background-color 0.3s ease;
      }
      &:hover:before {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
  &__info {
    grid-column: 2/3;
    grid-row: 1/-1;
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    font-size: 25px;
    &_artist {
      color: #eee;
      font-size: 1.8em;
      font-weight: 700;
    }
    &_album {
      color: #eee;
      font-size: 1em;
      font-weight: 700;
      width: 100%;
      padding-bottom: 9px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
    &_other {
      margin-top: 5px;
      color: #fefefe;
      font-size: 0.6em;
      strong {
        color: $green_Spotify;
      }
    }
  }
}
//X-Small
@media screen and (max-width: 576px) {
  .about {
    grid-template-rows: auto auto !important;
    &__description {
      padding-bottom: 20px;
      display: flex !important;
      flex-direction: column;
      &_image {
        width: 80%;
        max-width: 300px;
        align-self: center;
      }
      &_data {
        width: 90%;
        max-width: 400px;
        align-self: center;
        text-align: center;
        &-title {
          font-size: 25px;
        }
      }
    }
    &__info {
      font-size: 20px;
      &_artist {
        text-align: center;
        font-weight: 600;
      }
      &_album,
      &_other {
        width: 90%;
        max-width: 400px;
      }
      &_album {
        font-weight: 500;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .about {
    grid-template-columns: auto;
    grid-template-rows: 300px auto;
    &__description,
    &__info {
      grid-column: 1/-1;
    }
    &__description {
      grid-row: 1/2;
      display: grid;
      grid-template-columns: 250px auto;
      grid-template-rows: 70% 30%;
      align-items: center;
      &_image {
        grid-column: 1/2;
        grid-row: 1/-1;
      }
      &_data,
      &_listen {
        grid-column: 2/-1;
        margin-left: 20px;
      }
    }
    &__info {
      grid-row: 2/-1;
      font-size: 22px;
      &_artist {
        text-align: center;
        font-weight: 600;
      }
      &_album,
      &_other {
        width: 90%;
        max-width: 400px;
      }
      &_album {
        font-weight: 500;
        width: 100%;
        max-width: 100%;
      }
    }
  }
}
</style>

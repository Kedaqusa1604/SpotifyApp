<template>
  <div class="card" @click="goTo">
    <div class="card__image">
      <img :src="urlImg" :alt="name" loading="lazy" />
    </div>
    <div class="card__title">
      <p class="card__title_text">{{ name }}</p>
    </div>
    <div class="card__artist">
      <p class="card__artist_text" v-text="artist"></p>
      <template v-if="explicit">
        <p>Explicit</p>
      </template>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Song",
  props: {
    song: Object,
  },
  setup(props) {
    const name = props.song.name;
    const urlImg = props.song.album.images[1].url;
    const artist = props.song.artists[0].name;
    const explicit = props.song.explicit;
    const router = useRouter();
    const store = useStore();
    const goTo = () => {
      router.push({ name: "About", params: { id: props.song.id } });
    };
    return {
      name,
      urlImg,
      artist,
      explicit,
      router,
      goTo,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
$background: #464646;

.card {
  color: #fff;
  background: $background;
  width: 200px;
  height: 300px;
  margin: 5px;
  border: 1px solid #606061;
  padding: 5px 0;
  display: grid;
  grid-template-rows: 190px 60px 30px;
  grid-template-columns: 0px 190px 0px;
  gap: 5px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    box-shadow: 2px 2px 5px #606061;
  }
  &__image {
    grid-row: 1/2;
    grid-column: 2/3;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
  &__title {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 5px;
    color: #eeeeee;
    &_text {
      width: 100%;
      height: 100%;
      text-align: left;
      text-overflow: clip;
      line-height: 17px;
      font-size: 15px;
      font-weight: 500;
    }
  }
  &__artist {
    grid-column: 2/3;
    grid-row: 3/-1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 13px;
    color: #a3a7a6;
  }
}
// X-Small
@media screen and (max-width: 576px) {
  .card {
    width: 100%;
    max-width: 400px;
    height: 75px;
    margin-left: 10px;
    margin-right: 10px;
    grid-template-columns: 70px auto;
    grid-template-rows: 70% auto;
    padding: 5px;
    gap: 0;
    &__image {
      grid-column: 1/2;
      grid-row: 1/-1;
      display: flex;
      justify-content: center;
      img {
        height: 100%;
        width: auto;
      }
    }
    &__title {
      grid-column: 2/-1;
      grid-row: 1/2;
      padding-left: 10px;
      overflow: hidden;
      &_text {
        line-height: 20px;
      }
    }
    &__artist {
      grid-column: 2/-1;
      grid-row: 2/3;
      padding-left: 10px;
    }
  }
}
</style>

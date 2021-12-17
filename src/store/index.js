import { createStore } from "vuex";

export default createStore({
  state: {
    songs: [],
    songSelected: {},
  },
  mutations: {
    setSongs(state, payload) {
      state.songs = payload;
    },
    setSongSelected(state, payload) {
      state.songSelected = payload;
    },
  },
  actions: {
    async getSongs({ commit }, { token, query }) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/search?q=" + query + "&type=track",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            redirect: "follow",
          }
        );
        const data = await response.json();
        commit("setSongs", data.tracks.items);
      } catch (e) {
        console.log(e);
      }
    },
    async getSongSelected({ commit }, { token, id_song }) {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/tracks/" + id_song,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            redirect: "follow",
          }
        );
        const data = await response.json();
        commit("setSongSelected", data);
      } catch (e) {
        console.log("error: " + e);
      }
    },
  },
  modules: {},
  getters: {
    getSongSelected: (state) => {
      return state.songSelected;
    },
  },
});

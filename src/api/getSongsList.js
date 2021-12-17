const getAsyncSongs = async (songName) => {
  let response = await fetch(
    `https://api.spotify.com/v1/search?q=${songName}&type=track`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      redirect: "follow",
    }
  );
  let data = await response.json();
  return data.tracks.items;
};

export { getAsyncSongs };

export function prepareAlbumData(album){
  return {
    artist: album.artist,
    album: {name: album.name, image: album.image},
    tracks: album.tracks
  };
};


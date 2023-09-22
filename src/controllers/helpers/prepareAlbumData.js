/**
 * prepares album data for being inserted on database
 * @param {AlbumCreationObject} album
 * @returns {{artist: *, album: {image, name}, tracks: (Track[]|*)}}
 */
export function prepareAlbumData(album){
  return {
    artist: album.artist,
    album: {name: album.name, image: album.image},
    tracks: album.tracks
  };
}


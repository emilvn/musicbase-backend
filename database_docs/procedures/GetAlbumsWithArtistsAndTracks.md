## GetAlbumsWithArtistsAndTracks MySQL Procedure

### Description:

The GetAlbumsWithArtistsAndTracks MySQL procedure retrieves complete album data with associated artists and tracks from the database. It aggregates artist and track information into JSON arrays for each album.

### Procedure:
```sql
DELIMITER //

CREATE PROCEDURE GetAlbumsWithArtistsAndTracks()
BEGIN
    SELECT
        al.id AS album_id,
        al.name AS album_name,
        al.image AS album_image,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'artist_id', ar.id,
                'artist_name', ar.name,
                'artist_image', ar.image
            )
        ) AS artists,
        (
            SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'track_id', t.id,
                        'track_name', t.name
                    )
                )
            FROM
                album_tracks at
            LEFT JOIN
                tracks t ON at.track_id = t.id
            WHERE
                at.album_id = al.id
        ) AS tracks
    FROM
        albums al
    LEFT JOIN
        artist_albums aa ON al.id = aa.album_id
    LEFT JOIN
        artists ar ON aa.artist_id = ar.id
    GROUP BY
        al.id, al.name, al.image;
END;
//

DELIMITER ;
```
### Usage:

To use the GetAlbumsWithArtistsAndTracks procedure, call it as follows:
```sql
CALL GetAlbumsWithArtistsAndTracks();
```
This will retrieve album data with associated artists and tracks.

### Parameters:

The GetAlbumsWithArtistsAndTracks procedure does not take any parameters.

### Returns:

The procedure returns album data with associated artists and tracks, organized into JSON arrays.

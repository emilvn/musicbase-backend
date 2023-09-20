## `insertAlbum` MySQL Procedure

### Description:
The `insertAlbum` MySQL procedure inserts or updates album information in the database. It takes the album's name, image, and the artist's unique identifier as input parameters. It inserts the album data into the `albums` table, updates the image if the album already exists, and associates the album with the artist in the `artist_albums` table.

### Procedure:
```sql
DELIMITER //
CREATE PROCEDURE insertAlbum(album_name VARCHAR(255), album_image TEXT, artist_id_var INT)
BEGIN
DECLARE album_id_var INT;

    INSERT INTO albums (name, image)
    VALUES (album_name, album_image)
    ON DUPLICATE KEY UPDATE
        image = album_image;

    SET album_id_var = (SELECT id FROM albums WHERE name = album_name);

    INSERT INTO artist_albums (artist_id, album_id)
    VALUES (artist_id_var, album_id_var)
    ON DUPLICATE KEY UPDATE
        album_id = album_id_var;

    SELECT album_id_var AS id;
END //
DELIMITER ;
```
### Parameters:
- album_name (VARCHAR(255)): The name of the album to be inserted or updated.
- album_image (TEXT): The image URL or text associated with the album.
- artist_id_var (INT): The unique identifier of the artist associated with the album.

### Returns:
The procedure returns the album's unique identifier (`id`) after insertion or update.
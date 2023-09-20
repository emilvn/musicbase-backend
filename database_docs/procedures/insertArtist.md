## `insertArtist` MySQL Procedure

### Description:
The `insertArtist` MySQL procedure inserts or updates artist information in the database. It takes the artist's name and image as input parameters, inserts the data into the `artists` table, and returns the artist's unique identifier (`id`) or updates the image if the artist already exists.

### Procedure:
```sql
DELIMITER //
CREATE PROCEDURE insertArtist(artist_name VARCHAR(255), artist_image TEXT)
BEGIN
DECLARE return_artist_id INT;

    INSERT INTO artists (name, image)
    VALUES (artist_name, artist_image)
    ON DUPLICATE KEY UPDATE
        image = artist_image;

    SET return_artist_id = (SELECT id FROM artists WHERE name = artist_name);

    SELECT return_artist_id AS id;
END //
DELIMITER ;
```
### Parameters:
- artist_name (VARCHAR(255)): The name of the artist to be inserted or updated.
- artist_image (TEXT): The image URL or text associated with the artist.

### Returns:
The procedure returns the artist's unique identifier (`id`) after insertion or update.

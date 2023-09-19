## `getSpecificAlbum` MySQL Procedure

### Description

The `getSpecificAlbum` MySQL procedure retrieves album data for a specific album from the database. It selects the `id`, `name`, and `image` of the specified album and aggregates associated artist names into a JSON array.

### Procedure
```sql
-- Procedure to Get Specific Album Data
DELIMITER //
CREATE PROCEDURE getSpecificAlbum(IN input_id INT)
BEGIN
    SELECT
        al.id,
        al.name,
        al.image,
        JSON_ARRAYAGG(ar.name) 
        AS artist_names
    FROM
        albums al
    INNER JOIN
        artist_albums aa ON al.id = aa.album_id
    INNER JOIN
        artists ar ON aa.artist_id = ar.id
    WHERE al.id = input_id
    GROUP BY
        al.id, al.name, al.image;
END //
DELIMITER ;
```
### Usage

To use the `getSpecificAlbum` procedure, call it with the desired album's ID as follows:
```sql
CALL getSpecificAlbum(your_album_id);
```
This will retrieve album data including associated artist names for the specified album.

### Parameters

The `getSpecificAlbum` procedure takes one parameter:

- `input_id` (IN): The ID of the album to retrieve.

### Returns

The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the album.
- `name`: The name of the album.
- `image`: The image associated with the album.
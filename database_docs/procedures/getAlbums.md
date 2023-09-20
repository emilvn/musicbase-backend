## `getAlbums` MySQL Procedure

### Description

The `getAlbums` MySQL procedure retrieves album data from the database. It selects the `id`, `name`, and `image` of all albums and aggregates associated artist names into a JSON array.

### Procedure

```sql
DELIMITER //
CREATE PROCEDURE getAlbums()
BEGIN
    SELECT
        al.id,
        al.name,
        al.image,
        JSON_ARRAYAGG(
            ar.name) AS artist_names
    FROM
        albums al
    INNER JOIN
        artist_albums aa ON al.id = aa.album_id
    INNER JOIN
        artists ar ON aa.artist_id = ar.id
    GROUP BY
        al.id, al.name, al.image;
END //
DELIMITER ;
```
### Usage

To use the `getAlbums` procedure, call it as follows:
```sql
CALL getAlbums();
```
This will retrieve album data including associated artist names.

### Parameters

The `getAlbums` procedure does not take any parameters.

### Returns

The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the album.
- `name`: The name of the album.
- `image`: The image associated with the album.

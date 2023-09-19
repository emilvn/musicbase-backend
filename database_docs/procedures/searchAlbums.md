## `searchAlbums` MySQL Procedure

### Description:
The `searchAlbums` MySQL procedure is used to search for albums in the database based on a provided search string. It retrieves album data, including `id`, `name`, `image`, and a JSON array of associated artist names, for albums whose names contain the search string.

### Procedure:

```sql
DELIMITER //
CREATE PROCEDURE searchAlbums(IN searchstring VARCHAR(255))
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
        artist_albums aa ON al.id=aa.album_id
    INNER JOIN
        artists ar ON aa.artist_id = ar.id
    WHERE
        al.name LIKE CONCAT('%', searchstring, '%')
    GROUP BY
        al.id, al.name, al.image;
END;
DELIMITER ;
```

### Usage:
To use the `searchAlbums` procedure, call it as follows:

```sql
CALL searchAlbums('your_search_string');
```
This will retrieve albums that match the provided search string.

### Parameters:
The `searchAlbums` procedure takes one parameter:

- `searchstring` (IN): The search string to filter albums by.

### Returns:
The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the album.
- `name`: The name of the album.
- `image`: The image associated with the album.
- `artist_names`: A JSON array of associated artist names.
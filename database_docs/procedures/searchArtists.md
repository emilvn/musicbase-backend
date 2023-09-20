## `searchArtists` MySQL Procedure

### Description:
The `searchArtists` MySQL procedure is used to search for artists in the database based on a provided search string. It retrieves artist data, including `id`, `name`, and `image`, for artists whose names contain the search string.

### Procedure:
```sql
DELIMITER //
CREATE PROCEDURE searchArtists(IN searchstring VARCHAR(255))
BEGIN
    SELECT
        id,
        name,
        image
    FROM
        artists
    WHERE
        name LIKE CONCAT('%', searchstring, '%');
END;
DELIMITER ;
```

### Usage:
To use the `searchArtists` procedure, call it as follows:
```sql
CALL searchArtists('your_search_string');
```
This will retrieve artists whose names match the provided search string.

### Parameters:
The `searchArtists` procedure takes one parameter:

- `searchstring` (IN): The search string to filter artists by.

### Returns:
The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the artist.
- `name`: The name of the artist.
- `image`: The image associated with the artist.
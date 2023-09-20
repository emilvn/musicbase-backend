## `searchTracks` MySQL Procedure

### Description:
The `searchTracks` MySQL procedure is used to search for tracks in the database based on a provided search string. It retrieves track data, including `id`, `name`, and `album_id`, for tracks whose names contain the search string.

### Procedure:
```sql
DELIMITER //
CREATE PROCEDURE searchTracks(IN searchstring VARCHAR(255))
BEGIN
    SELECT
        tr.id,
        tr.name,
        at.album_id AS album_id
    FROM
        tracks tr
    INNER JOIN
        album_tracks at ON at.track_id = tr.id
    WHERE
        tr.name LIKE CONCAT('%', searchstring, '%');
END;
DELIMITER ;
```
### Usage:
To use the `searchTracks` procedure, call it as follows:
```sql
CALL searchTracks('your_search_string');
```
This will retrieve tracks whose names match the provided search string.

### Parameters:
The `searchTracks` procedure takes one parameter:

- `searchstring` (IN): The search string to filter tracks by.

### Returns:
The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the track.
- `name`: The name of the track.
- `album_id`: The identifier of the album associated with the track.
## `getTracks` MySQL Procedure

### Description

The `getTracks` MySQL procedure retrieves track data from the database. It selects the `id`, `name`, and `album_id` of all tracks.

### Procedure
```sql
DELIMITER //
CREATE PROCEDURE getTracks()
BEGIN
    SELECT
        tr.id,
        tr.name,
        at.album_id AS album_id
    FROM
        tracks tr
    INNER JOIN
        album_tracks at ON at.track_id = tr.id;
END //
DELIMITER ;
```
### Usage

To use the `getTracks` procedure, call it as follows:
```sql
CALL getTracks();
```
This will retrieve track data including the associated album identifier.

### Parameters

The `getTracks` procedure does not take any parameters.

### Returns

The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the track.
- `name`: The name of the track.
- `album_id`: The identifier of the album associated with the track.

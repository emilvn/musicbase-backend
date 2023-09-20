## `insertTracks` MySQL Procedure

### Description:
The `insertTracks` MySQL procedure inserts track information into the database. It takes a JSON array of track names and an album's unique identifier as input parameters. It inserts the track data into the `tracks` table, ensuring no duplicates, and associates the tracks with the album in the `album_tracks` table.

### Procedure:
```sql
DELIMITER //
CREATE PROCEDURE insertTracks(json_data JSON, album_id_var INT)
BEGIN
DECLARE last_inserted_id INT;
DECLARE next_id INT;
DECLARE max_id INT;

    SELECT MAX(id) INTO max_id FROM tracks;

    IF (max_id IS NULL) THEN
        SET max_id = 0;
    END IF;

    INSERT INTO tracks (name)
    SELECT jt.name
    FROM JSON_TABLE(
        json_data,
        '$[*]'
        COLUMNS (
            name VARCHAR(255) PATH '$'
        )
    ) AS jt
    ON DUPLICATE KEY UPDATE
        name = jt.name;

    SELECT MAX(id) INTO last_inserted_id FROM tracks;
    SET next_id = max_id + 1;

    WHILE next_id < last_inserted_id + 1 DO
        IF EXISTS (SELECT * FROM tracks WHERE id = next_id) THEN
            INSERT INTO album_tracks (album_id, track_id) VALUES (album_id_var, next_id)
            ON DUPLICATE KEY UPDATE
                track_id = next_id;
        END IF;
        SET next_id = next_id + 1;
    END WHILE;
END //
DELIMITER ;
```
### Parameters:
- json_data (JSON): A JSON array of track names to be inserted.
- album_id_var (INT): The unique identifier of the album associated with the tracks.

### Returns:
The procedure associates the tracks with the album.
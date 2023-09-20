## `getArtists` MySQL Procedure

### Description

The `getArtists` MySQL procedure retrieves artist data from the database. It selects the `id`, `name`, and `image` of all artists stored in the "artists" table.

### Procedure

```sql
DELIMITER //
CREATE PROCEDURE getArtists()
BEGIN
    SELECT
        id,
        name,
        image
    FROM
        artists;
END //
DELIMITER ;
```
### Usage

To use the `getArtists` procedure, call it as follows:
```sql
CALL getArtists();
```
This will retrieve all artist data from the "artists" table.

### Parameters

The `getArtists` procedure does not take any parameters.

### Returns

The procedure returns a result set containing the following columns:

- `id`: The unique identifier of the artist.
- `name`: The name of the artist.
- `image`: The image associated with the artist.
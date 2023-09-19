## artist_albums Table

### Description:
The `artist_albums` table establishes a many-to-many relationship between artists and albums. It stores information about which artists are associated with which albums.

### Table Structure:
```sql
CREATE TABLE artist_albums (
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    PRIMARY KEY (artist_id, album_id),
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);
```
### Columns:
- `artist_id (INT)`: The unique identifier of the artist associated with the album. It is a foreign key referencing the `id` column in the `artists` table.

- `album_id (INT)`: The unique identifier of the album associated with the artist. It is a foreign key referencing the `id` column in the `albums` table.

### Constraints:
- The combination of `artist_id` and `album_id` forms the primary key, ensuring that each association between an artist and an album is unique.
- There are foreign key constraints on both `artist_id` and `album_id`, enforcing referential integrity with the `artists` and `albums` tables. If a referenced record is deleted in the parent tables (`artists` or `albums`), the corresponding records in `artist_albums` will be deleted (ON DELETE CASCADE).
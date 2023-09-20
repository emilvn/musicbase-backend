## album_tracks Table

### Description:
The `album_tracks` table establishes a many-to-many relationship between albums and tracks. It stores information about which tracks are associated with which albums.

### Table Structure:
```sql
CREATE TABLE album_tracks (
    album_id INT NOT NULL,
    track_id INT NOT NULL,
    PRIMARY KEY (album_id, track_id),
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE
);
```
### Columns:
- `album_id (INT)`: The unique identifier of the album to which the track belongs. It is a foreign key referencing the `id` column in the `albums` table.

- `track_id (INT)`: The unique identifier of the track associated with the album. It is a foreign key referencing the `id` column in the `tracks` table.

### Constraints:
- The combination of `album_id` and `track_id` forms the primary key, ensuring that each association between an album and a track is unique.
- There are foreign key constraints on both `album_id` and `track_id`, enforcing referential integrity with the `albums` and `tracks` tables. If a referenced record is deleted in the parent tables (`albums` or `tracks`), the corresponding records in `album_tracks` will be deleted (ON DELETE CASCADE).
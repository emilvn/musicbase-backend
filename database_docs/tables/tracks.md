## tracks Table

### Description:
The tracks table stores information about tracks, including their unique identifier (id) and name.

### Table Structure:
```sql
CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name NVARCHAR(255)
);
```
Columns:
- `id (INT)`: The unique identifier of the track. It is an auto-incremented integer and serves as the primary key.

- `name (NVARCHAR(255))`: The name of the track.

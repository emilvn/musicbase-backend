## albums Table

### Description:
The albums table stores information about albums, including their unique identifier (id), name, and an optional image URL (image).

### Table Structure:
```sql
CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name NVARCHAR(255),
    image TEXT
);
```
### Columns:
- `id (INT)`: The unique identifier of the album. It is an auto-incremented integer and serves as the primary key.
- `name (NVARCHAR(255))`: The name of the album.
- `image (TEXT)`: An optional field that can store a URL or text related to the album's image.


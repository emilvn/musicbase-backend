## artists Table

### Description:
The artists table stores information about artists, including their unique identifier (id), name, and an optional image URL (image).

### Table Structure:
```sql
CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name NVARCHAR(255) UNIQUE NOT NULL,
    image TEXT
);
```

### Columns:
- `id (INT)`: The unique identifier of the artist. It is an auto-incremented integer and serves as the primary key.

- `name (NVARCHAR(255))`: The name of the artist. It must be unique, ensuring that no two artists have the same name.

- `image (TEXT)`: An optional field that can store a URL or text related to the artist's image.
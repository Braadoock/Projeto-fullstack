-- database: ./db.sqlite
CREATE TABLE
    "links" (
        "id" INTEGER PRIMARY KEY,
        "titulo" TEXT NOT NULL,
        "url" TEXT NOT NULL,
        "criado_em" TEXT DEFAULT CURRENT_TIMESTAMP
    ) STRICT;

ALTER TABLE links
ADD COLUMN publicado INTEGER DEFAULT 0;
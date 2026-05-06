-- database: ./db.sqlite

CREATE TABLE
    "links" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT,
    "url" TEXT,
    criado_em DATETIME
    ) STRICT;

DROP TABLE "links";
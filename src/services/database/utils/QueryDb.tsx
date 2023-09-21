import { NameTableArt } from "./Constants";


export const CreateTableQuery = `
        CREATE TABLE IF NOT EXISTS ${NameTableArt} (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT,
            artist_display TEXT,
            image_id TEXT,
            description TEXT
        );`;

export const QueryAddArt = `INSERT INTO ${NameTableArt} (id, title, artist_display, image_id,description) VALUES (?, ?, ?, ?, ?)`

export const DeleteArt = `DELETE FROM ${NameTableArt} WHERE id = ?`


export enum QueryAll {
  ART = `SELECT * FROM ${NameTableArt}`
}

interface QueryFactory {
  createQuery: (type: QueryAll) => string;
}


export const QueryFactory: QueryFactory = {
  createQuery: (type) => {
    switch (type) {
      case QueryAll.ART:
        return `SELECT * FROM ${NameTableArt}`;
    }
  },
};
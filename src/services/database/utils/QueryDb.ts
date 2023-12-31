import { NameTableArt } from "./Constants";


export const CreateTableQuery = `
        CREATE TABLE IF NOT EXISTS ${NameTableArt} (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT,
            artist_display TEXT,
            image_id TEXT,
            description TEXT,
            term_title TEXT,
            thumbnail TEXT,
            provenance_text TEXT
        );`;

export const QueryAddArt = `INSERT INTO ${NameTableArt} (id, title, artist_display, image_id,description,term_title,thumbnail,provenance_text) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

export const DeleteArt = `DELETE FROM ${NameTableArt} WHERE id = ?`

export const SelectArt = `SELECT * FROM ${NameTableArt} WHERE id = ?`


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
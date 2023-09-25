import { ArtModel } from "../../../server/models/ApiModel";
import { getDBConnection } from "../../DbProvider";
import { DeleteArt, QueryAddArt, QueryAll, QueryFactory, SelectArt } from "../../utils/QueryDb";
import IDaoArt from "./IDaoArt";


class DaoArt implements IDaoArt{

    async getListFavoriteArt(): Promise<ArtModel[]> {
        const db = await getDBConnection()
        return new Promise<ArtModel[]>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(QueryFactory.createQuery(QueryAll.ART),
                    [],
                    (tx, results) => {
                        const len = results.rows.length;
                        const datos: ArtModel[] = [];
                        for (let i = 0; i < len; i++) {
                            const fila = results.rows.item(i);
                            const artModel: ArtModel = {
                                id: fila.id,
                                title: fila.title,
                                main_reference_number: "empty",
                                artist_display: fila.artist_display,
                                image_id: fila.image_id,
                                description: fila.description,
                                favorite: true,
                                term_titles: fila.term_title.split(', '),
                                thumbnail:fila.thumbnail,
                                provenance_text:fila.provenance_text
                            };
                            datos.push(artModel);
                        }
                        resolve(datos);
                    },
                    (error) => {
                        console.error('Error al obtener datos de la tabla:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    async getDetailArt(idArt: number): Promise<ArtModel | null> {
        const db = await getDBConnection()
        return new Promise<ArtModel | null>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(SelectArt,
                    [idArt],
                    (tx, results) => {
                        const len = results.rows.length;
                        if (len > 0) {
                            const fila = results.rows.item(0);
                            const artModel: ArtModel = {
                                id: fila.id,
                                title: fila.title,
                                main_reference_number: "empty",
                                artist_display: fila.artist_display,
                                image_id: fila.image_id,
                                description: fila.description,
                                favorite: true,
                                term_titles: fila.term_title.split(', '),
                                thumbnail:fila.thumbnail,
                                provenance_text:fila.provenance_text
                            };
                            resolve(artModel);
                        } else {
                            resolve(null);
                        }
                    },
                    (error) => {
                        console.error('Error al obtener datos de la tabla:', error);
                        reject(error);
                    }
                );
            });
        });
    }

    async saveArt(artModel: ArtModel):Promise<Boolean> {
        const { id, title, artist_display, image_id, description, term_titles,thumbnail,provenance_text } = artModel;
        const joinTerm = term_titles?.join(', ');
        const dbOpen = await getDBConnection()
        return new Promise<Boolean>((resolve,reject) => {   
            dbOpen.transaction((tx) => {
                tx.executeSql(
                    QueryAddArt,
                    [id, title, artist_display, image_id, description, joinTerm,thumbnail?.alt_text,provenance_text],
                    (tx, results) => {
                        resolve(results.rowsAffected > 0)
                    },
                    (error) => {
                        reject(error)
                    }
                );
            })
        })
    }

    async deleteArt(idArt: number):Promise<Boolean> {
        const db = await getDBConnection()
        return new Promise<Boolean>((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    DeleteArt,
                    [idArt],
                    (tx, results) => {
                        resolve(results.rowsAffected > 0)
                    },
                    (error) => {
                        reject(error)
                    }
                );
            });
        })
    }

}

export default DaoArt
import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import { ArtModel } from '../server/models/ApiModel';
import { LogCustome } from '../../utils/Utils';
import { CreateTableQuery, QueryAddArt, QueryFactory, QueryAll,DeleteArt } from './utils/QueryDb';


const getDBConnection = async () => {
  return openDatabase({ name: 'artGallery.db', location: 'default' }, () => {
    LogCustome.info("Database connected!")
  }, error => LogCustome.error("Database error", error));
};

export const CreateTablesApp = async () => {
  const dbOpen = await getDBConnection()
  createTableArt(dbOpen)
}

const createTableArt = async (db: SQLiteDatabase) => {
  await db.executeSql(CreateTableQuery);
};

export const SaveArt = async (artModel: ArtModel) => {
  const { id, title, artist_display, image_id } = artModel;
  const dbOpen = await getDBConnection()
  dbOpen.transaction((tx) => {
    tx.executeSql(
      QueryAddArt,
      [id, title, artist_display, image_id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          LogCustome.info("Nuevo dato insertado correctamente")
        } else {
          LogCustome.error("Error al insertar el nuevo dato")
        }
      },
      (error) => {
        LogCustome.error("Error al insertar el nuevo dato", error)
      }
    );
  })
}

export const GetFavoriteArt = async (): Promise<ArtModel[]> => {
  const db = await getDBConnection()
  return new Promise<ArtModel[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        QueryFactory.createQuery(QueryAll.ART),
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

export const DeleteFavoriteArt = async (id:number): Promise<Boolean> =>{
  const db = await getDBConnection()
  return new Promise<Boolean>((resolve,reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        DeleteArt,
        [id],
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


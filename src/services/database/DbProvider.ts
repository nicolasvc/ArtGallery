import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage'
import { LogCustome } from '../../utils/Utils';
import { CreateTableQuery} from './utils/QueryDb';


export const getDBConnection = async () => {
  return openDatabase({ name: 'artGallery.db', location: 'default' }, () => {
    LogCustome.info("Database connected!")
  }, error => LogCustome.error("Database error", error));
};


class DbProvider{
 
  async getConnectionDB():Promise<SQLiteDatabase>{
    return openDatabase({ name: 'artGallery.db', location: 'default' }, () => {
      LogCustome.info("Database connected!")
    }, error => LogCustome.error("Database error", error));
  }

  async createTables(){
    const dbOpen = await getDBConnection()
    this.createTableArt(dbOpen)
  }

  private async createTableArt(db: SQLiteDatabase){
    await db.executeSql(CreateTableQuery);
  }

}

export default DbProvider








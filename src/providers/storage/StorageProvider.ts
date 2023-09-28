import EncryptedStorage from 'react-native-encrypted-storage';



class StorageProvider {

  async storeData<T>(key: string, data: T): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await EncryptedStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error to save data', error);
    }
  }

  async retrieveData<T>(key: string): Promise<T | null> {
    try {
      const serializedData = await EncryptedStorage.getItem(key);
      if (serializedData) {
        const parsedData: T = JSON.parse(serializedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Error to getData', error);
    }
    return null;
  }
}

export default StorageProvider
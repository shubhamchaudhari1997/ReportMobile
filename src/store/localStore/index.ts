import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItem = async (key: string, value: any) => {
  try {
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    console.info('Item with some key and value stored');
  } catch (error) {
    console.error('Error while saving some key value');
  }
};

const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error('Error while retrieving some key');
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key, () => {
      console.info('Item with some key removed');
    });

    return null;
  } catch (error) {
    console.error('Error while removing some key');
  }
};

const keys = {
  USER_DATA: 'UserData',
  LOGIN: 'login',
  GUEST_USER: 'guestUser',
  FLAG_MODAL: 'flagModal',
};

//local storage utils

export {storeItem, getItem, removeItem, keys};

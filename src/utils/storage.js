import AsyncStorage from '@react-native-async-storage/async-storage';

// 设置 Token
export const storeAuthorization = async (value) => {
  try {
    await AsyncStorage.setItem('@Authorization', value);
  } catch (e) {
    // saving error
  }
};

// 获取 Token
export const getAuthorization = async () => {
  try {
    const value = await AsyncStorage.getItem('@Authorization');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

// 删除 Token
export const removeAuthorization = async () => {
  try {
    await AsyncStorage.removeItem('@Authorization');
  } catch (e) {
    // remove error
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const SYMPTOM_HISTORY_KEY = 'SYMPTOM_HISTORY';
const USER_SETTINGS_KEY = 'USER_SETTINGS';

export const saveSymptomRecord = async (record) => {
  try {
    // Get existing records
    const existingRecordsJson = await AsyncStorage.getItem(SYMPTOM_HISTORY_KEY);
    const existingRecords = existingRecordsJson ? JSON.parse(existingRecordsJson) : [];
    
    // Add new record
    const updatedRecords = [...existingRecords, record];
    
    // Save back to storage
    await AsyncStorage.setItem(SYMPTOM_HISTORY_KEY, JSON.stringify(updatedRecords));
    return true;
  } catch (error) {
    console.error('Error saving symptom record:', error);
    return false;
  }
};

export const loadSymptomHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(SYMPTOM_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error loading symptom history:', error);
    return [];
  }
};

export const clearSymptomHistory = async () => {
  try {
    await AsyncStorage.removeItem(SYMPTOM_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing symptom history:', error);
    return false;
  }
};

export const saveUserSettings = async (settings) => {
  try {
    await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving user settings:', error);
    return false;
  }
};

export const loadUserSettings = async () => {
  try {
    const settingsJson = await AsyncStorage.getItem(USER_SETTINGS_KEY);
    return settingsJson ? JSON.parse(settingsJson) : null;
  } catch (error) {
    console.error('Error loading user settings:', error);
    return null;
  }
};

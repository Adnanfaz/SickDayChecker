import React, { createContext, useState, useEffect } from 'react';
import { getLocalFluData } from '../api/healthApi';
import { loadSymptomHistory, saveSymptomRecord, clearSymptomHistory } from '../utils/storage';

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [location, setLocation] = useState('');
  const [fluData, setFluData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    // Load symptom history when app starts
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const history = await loadSymptomHistory();
    if (history) {
      setSymptomHistory(history);
    }
  };

  const clearHistory = async () => {
    try {
      await clearSymptomHistory();
      setSymptomHistory([]);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  };

  const updateLocation = async (newLocation) => {
    setLocation(newLocation);
    setApiError(null); // Reset any previous errors
    
    if (newLocation) {
      setIsLoading(true);
      try {
        const data = await getLocalFluData(newLocation);
        console.log('Flu data received in context:', data);
        
        if (data && Array.isArray(data)) {
          // Check if we got fallback data
          if (data.length > 0 && data[0].isFallbackData) {
            console.warn('Using fallback data');
            setApiError('Could not fetch real-time data. Using estimated values.');
          }
          setFluData(data);
        } else {
          console.error('Unexpected data format:', data);
          setApiError('Received invalid data format from API');
          setFluData(null);
        }
      } catch (error) {
        console.error('Error in updateLocation:', error);
        setApiError('Failed to fetch health data. Please try again later.');
        setFluData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addSymptomRecord = async (record) => {
    // Add timestamp to record
    const recordWithTimestamp = {
      ...record,
      timestamp: new Date().toISOString(),
    };
    
    // Add to local state
    const updatedHistory = [...symptomHistory, recordWithTimestamp];
    setSymptomHistory(updatedHistory);
    
    // Save to AsyncStorage
    await saveSymptomRecord(recordWithTimestamp);
  };

  return (
    <HealthContext.Provider
      value={{
        location,
        fluData,
        isLoading,
        symptomHistory,
        apiError,
        updateLocation,
        addSymptomRecord,
        loadHistory,
        clearHistory,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};
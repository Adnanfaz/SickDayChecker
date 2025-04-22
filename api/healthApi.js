import axios from 'axios';

// Updated to a valid CDC FluView dataset (Influenza data)
const FLU_API_BASE_URL = 'https://data.cdc.gov/resource/pj7m-y5uh.json';

export const getLocalFluData = async (location) => {
  console.log('Fetching flu data for location:', location);
  try {
    // Params to filter by state/region for flu data
    const params = {
      $limit: 5,  // Limit to 5 results for testing
      ...(location && { state: location })  // Filter by location (state/region)
    };
    
    console.log('API params:', params);
    const response = await axios.get(FLU_API_BASE_URL, { params });
    
    console.log('API response status:', response.status);
    console.log('API response data sample:', 
      response.data.length > 0 ? response.data[0] : 'No data');
    
    if (response.data.length === 0) {
      console.warn('No flu data found for location:', location);
      // Fallback if no data found for specific location
      const fallbackResponse = await axios.get(FLU_API_BASE_URL, { 
        params: { $limit: 3 }  // Broader fallback data
      });
      
      if (fallbackResponse.data.length > 0) {
        console.log('Using fallback data from general search');
        return fallbackResponse.data;
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching flu data:', error.message);
    
    // Handle specific response errors
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    
    // Return fallback data for demo purposes
    return [{
      state: location || 'National',
      activity_level: 'moderate',
      trend: 'increasing',
      isFallbackData: true
    }];
  }
};

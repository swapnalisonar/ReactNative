// Import necessary modules
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// API endpoint and key
const BASE_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';
const API_KEY = '6f102c62f41998d151e5a1b48713cf13';

// Function to fetch recent photos from the API
const getRecentPhotos = async () => {
  try {
    // Send a GET request to the API endpoint
    const response = await axios.get(`${BASE_URL}`);
    // Return the photo data from the response
    return response.data.photos.photo;
  } catch (error) {
    // Handle errors and throw an error to be caught by the caller
    console.error('Error fetching recent photos:', error);
    throw error;
  }
};

// Function to cache photos using AsyncStorage
const cachePhotos = async (photos) => {
  try {
    // Convert the photos array to a JSON string and store it in AsyncStorage
    await AsyncStorage.setItem('cachedPhotos', JSON.stringify(photos));
  } catch (error) {
    // Handle errors and throw an error to be caught by the caller
    console.error('Error caching photos:', error);
    throw error;
  }
};

// Function to retrieve cached photos from AsyncStorage
const getCachedPhotos = async () => {
  try {
    // Retrieve the cached photos JSON string from AsyncStorage
    const cachedPhotos = await AsyncStorage.getItem('cachedPhotos');
    // If cachedPhotos exists, parse the JSON string and return the array; otherwise, return an empty array
    return cachedPhotos ? JSON.parse(cachedPhotos) : [];
  } catch (error) {
    // Handle errors and throw an error to be caught by the caller
    console.error('Error getting cached photos:', error);
    throw error;
  }
};

// Export the functions to be used in other parts of the application
export { getRecentPhotos, cachePhotos, getCachedPhotos };

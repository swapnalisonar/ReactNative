// Import necessary modules
import React from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Define the CachedImage component
const CachedImage = ({ source, style }) => {
  // Destructure the source object to get the URI of the image
  const { uri } = source;

  // Define a function to get the image and handle caching
  const getImage = async () => {
    // Construct the local URI using the cache directory and original URI
    const localUri = `${FileSystem.cacheDirectory}${uri}`;
    
    // Get information about the local file
    const info = await FileSystem.getInfoAsync(localUri);

    // If the file exists locally, return the local URI
    if (info.exists) {
      return { uri: localUri };
    } else {
      // If the file doesn't exist locally, download it from the original URI
      await FileSystem.downloadAsync(uri, localUri);
      return { uri: localUri };
    }
  };

  // Render an Image component with the cached image source and style
  return <Image source={getImage()} style={style} />;
};

// Export the CachedImage component
export default CachedImage;

// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { getRecentPhotos, cachePhotos, getCachedPhotos } from './api';

// Define the HomeScreen component
const HomeScreen = () => {
  // State to store fetched photos
  const [photos, setPhotos] = useState([]);

  // Number of columns for the FlatList
  const columnCount = 3;

  // Calculate the width for each image based on the window width and column count
  const imageWidth = Dimensions.get('window').width / columnCount;

  // Specify the fixed height for each image
  const imageHeight = 100;

  // Use useEffect to fetch and cache photos on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Try to retrieve cached photos
        const cachedPhotos = await getCachedPhotos();

        // If cached photos exist, set them in the state
        if (cachedPhotos.length > 0) {
          setPhotos(cachedPhotos);
        } else {
          // If no cached photos, fetch recent photos from API
          const recentPhotos = await getRecentPhotos();
          console.log('Recent photos from API:', recentPhotos);
          setPhotos(recentPhotos);
          await cachePhotos(recentPhotos);
        }
      } catch (error) {
        console.error('Error fetching and caching data:', error);
      }
    }

    // Fetch and cache photos
    fetchData();
  }, []);

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.url_s }}
      style={[styles.image, { width: imageWidth, height: imageHeight }]}
    />
  );

  // Return the JSX for the HomeScreen component
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Photos</Text>
      {/* FlatList to display photos */}
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={columnCount}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 8,
    margin: 3,
  },
});

// Export the HomeScreen component
export default HomeScreen;

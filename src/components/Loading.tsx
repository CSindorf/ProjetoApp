import React from 'react';
import { ActivityIndicator, Dimensions, ImageBackground, StyleSheet, View } from 'react-native';

const Loading = () => (
  <ImageBackground source={require('../assets/image-background-login.jpg')} style={styles.imageBackground}>
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#9ee9f0" />
  </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  imageBackground: {
    resizeMode: "repeat",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Loading;
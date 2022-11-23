import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: '#6cc1d4',
        //marginTop: StatusBar.currentHeight || 0,
        paddingTop: 6
    },
    imageBackground: {
        resizeMode: "repeat",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        //flex: 1,
        justifyContent: "center",
        height: 130
      },
});
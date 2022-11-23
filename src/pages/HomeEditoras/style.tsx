import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingTop: 6,
        marginBottom:150
    },
    imageBackground: {
        resizeMode: "repeat",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image: {
        height: 130,
        width: 130
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        padding: 5,
        margin: 10,
        color: '#2a8ba1'
    },
    destaque: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 20,
        padding: 10,
        borderRadius: 5,
        //height: Dimensions.get('window').height * 0.9,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        elevation: 5,
        shadowColor: '#000',
    },
    pageTitle: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: '#000',
        padding: 16
      },
});
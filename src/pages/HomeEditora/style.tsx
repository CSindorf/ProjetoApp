import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#6cc1d4',
    //marginTop: StatusBar.currentHeight || 0,
    paddingTop: 6,

  },
  title: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    margin: 10,
    color: '#000000'
  },
  image: {
    //flex: 1,
    justifyContent: "center",
    height: 130
  },
  imageBackground: {
    resizeMode: "repeat",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  destaque: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 15,
    padding: 3,
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
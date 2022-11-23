import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#6cc1d4',
    //marginTop: StatusBar.currentHeight || 0,
    paddingTop: 6,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginLeft:8,
    marginRight:8,
    borderRadius:5,
    height:150,
    width:150
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: '#6cc1d4cd',
    padding:5,
    margin:10,
    color: '#ffffff'
  },
  titleLivro: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    padding:5,
    margin:5,
    color: '#ffffff'
  },
  itemLivro: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#6cc1d4cd',
    marginLeft:8,
    marginRight:8,
    borderRadius:5,
    height:250,
    width:150,
    shadowColor: '#000'
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
  pageTitle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: '#000',
    padding:16,
    backgroundColor: '#fff'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 10,
    shadowRadius: 10,
  },
  destaque:{
    height:350,
    margin:20,
    borderRadius:5,
    //height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#fff',
    marginBottom:150
  },
  destaqueTitle:{
    color: '#000',
    fontSize: 20,
    padding:16,
    fontWeight: "bold",
  },
  destaqueAutor:{
    color: '#000',
    fontSize: 20,
    paddingLeft:16,
  }
});
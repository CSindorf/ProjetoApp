import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#6cc1d4',
    //marginTop: StatusBar.currentHeight || 0,
    paddingTop: 6,
  },
  item: {
    marginHorizontal:10,
    marginTop:20,
    marginBottom:20,
    padding:10,
    width:150,
    height:150,
    justifyContent:'center',
    flexDirection:"row",
    alignItems:'center',
    backgroundColor: '#6cc1d4',
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: '#6cc1d4cd',
    padding: 5,
    margin: 10,
    color: '#ffffff'
  },
  titleLivro: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    margin: 5,
    color: '#ffffff'
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
    padding: 16,
    backgroundColor: '#fff'
  },
  destaque: {
    height: 350,
    margin: 20,
    borderRadius: 5,
    //height: Dimensions.get('window').height * 0.9,
    backgroundColor: '#fff',
    marginBottom: 150,
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
  },
  destaqueTitle: {
    color: '#000',
    fontSize: 20,
    padding: 16,
    fontWeight: "bold",
  },
  destaqueAutor: {
    color: '#000',
    fontSize: 20,
    paddingLeft: 16,
  },
  cardLivro: {
    marginHorizontal: 8,
    padding:10,
    justifyContent:'center',
    margin:20,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
  },
  itemLivro: {
    height:300
  },
});
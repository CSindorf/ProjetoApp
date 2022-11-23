import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a8ba1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 60
  },
  input: {
    borderWidth: 2,
    borderRadius: 15,
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontWeight: "bold",
    backgroundColor: '#cfe3e784'
  },
  botao: {
    backgroundColor: '#190152',
    width: Dimensions.get('window').width * 0.9,
    padding: 20,
    borderRadius: 15,
    marginTop: 40
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  imageBackground: {
    resizeMode: "repeat",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
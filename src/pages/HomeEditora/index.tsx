import React from 'react';
import {
    View,
    Text,
} from 'react-native';

const HomeEditora = ({ route, navigation }) => {
    const { editoraId } = route.params;
    
    return (
        <View>
            <Text>Home Editora</Text>
        </View>
    );
}

export default HomeEditora
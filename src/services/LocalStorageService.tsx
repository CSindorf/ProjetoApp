import EncryptedStorage from "react-native-encrypted-storage";

const storeLocalData = async (key: string, value: any) => {
    try {
        await EncryptedStorage.setItem(
            key,
            value
            // JSON.stringify({
            //     age : 21,
            //     token : "ACCESS_TOKEN",
            //     username : "emeraldsanto",
            //     languages : ["fr", "en", "de"]
            // })
        );
    } catch (error) {
        console.log(`Erro ao armazenar os dados ${error}`)
    }
};

const retrieveLocalData = async (key: string) => {
    try {
        const data = await EncryptedStorage.getItem(key);

        if (data !== undefined) {
        }
    } catch (error) {
        console.log(`Erro ao recuperar os dados ${error}`)
    }
};

const removeLocalData = async (key: string) => {
    try {
        await EncryptedStorage.removeItem(key);
    } catch (error) {
        console.log(`Erro ao remover os dados ${error}`)
    }
};

export { storeLocalData, retrieveLocalData, removeLocalData };
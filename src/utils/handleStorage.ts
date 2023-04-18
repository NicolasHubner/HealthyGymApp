import { FineShape } from '@/types/fineshape/FineShape';
import { User } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_USER_KEY = '@CrossLifeApp/user';
const STORAGE_USER_TOKEN_KEY = '@CrossLifeApp/user-token';
const STORAGE_FINE_SHAPE_KEY = '@CrossLifeApp/fine-shape';

export async function saveUserDataInStorage(data: User) {
    if (typeof data === 'undefined' || data === null) return;

    try {
        const dataString = JSON.stringify(data);
        await AsyncStorage.setItem(STORAGE_USER_KEY, dataString);
    } catch (err) {
        console.error('Ocorreu um erro ao salvar os dados do usuário no async storage.', err);
    }
}

export async function getUserDataFromStorage(): Promise<User | undefined> {
    try {
        const userFromStorage = await AsyncStorage.getItem(STORAGE_USER_KEY);

        if (userFromStorage !== null) {
            return JSON.parse(userFromStorage);
        }

        return undefined;
    } catch (err) {
        console.error('Ocorreu um erro ao capturar os dados do usuário no async storage.', err);
    }
}

export async function clearUserDataFromStorage() {
    try {
        await AsyncStorage.removeItem(STORAGE_USER_KEY);
    } catch (err) {
        console.error('Ocorreu um erro ao remover os dados do usuário no async storage.', err);
    }
}

export async function saveUserTokenIntoStorage(token: string) {
    if (typeof token === 'undefined' || token === null) return;

    try {
        await AsyncStorage.setItem(STORAGE_USER_TOKEN_KEY, token);
    } catch (err) {
        console.error('Ocorreu um erro ao salvar os dados do usuário no async storage.', err);
    }
}

export async function getUserTokenFromStorage(): Promise<string | undefined> {
    try {
        const userTokenFromStorage = await AsyncStorage.getItem(STORAGE_USER_TOKEN_KEY);

        if (userTokenFromStorage !== null) {
            return JSON.parse(userTokenFromStorage) as string;
        }

        return undefined;
    } catch (err) {
        console.error('Ocorreu um erro ao capturar os dados do usuário no async storage.', err);
    }
}

export async function saveFineshapeDataInStorage(data: FineShape) {
    if (typeof data === 'undefined' || data === null) return;

    try {
        console.log('rodando...');
        const dataString = JSON.stringify(data);
        await AsyncStorage.setItem(STORAGE_FINE_SHAPE_KEY, dataString);
        console.log('salvou!');
    } catch (err) {
        console.error('Ocorreu um erro ao salvar os dados do fineshape no async storage.', err);
    }
}

export async function getFineshapeDataFromStorage(): Promise<FineShape | undefined> {
    try {
        const userFineshapeInfoFromStorage = await AsyncStorage.getItem(STORAGE_FINE_SHAPE_KEY);

        if (userFineshapeInfoFromStorage !== null) {
            return JSON.parse(userFineshapeInfoFromStorage);
        }

        return undefined;
    } catch (err) {
        console.error('Ocorreu um erro ao capturar os dados do usuário no async storage.', err);
    }
}

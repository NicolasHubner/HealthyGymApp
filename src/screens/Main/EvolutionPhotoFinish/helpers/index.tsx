import * as FileSystem from 'expo-file-system';

export const ConvertToBase64 = async (file: string) => {
    const base64 = await FileSystem.readAsStringAsync(file, {
        encoding: 'base64',
    });
    return base64;
};

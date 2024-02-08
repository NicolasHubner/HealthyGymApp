import { api } from '@/services/api';
import { setUserInfo } from '@/store/user';
import { Dispatch } from 'react';
import { DataPhotos } from '../../UserPhoto';
import { AnyAction } from '@reduxjs/toolkit';

interface GettingPhotosProps {
    headers: { Authorization: string };
    id?: number;
    dispatch: Dispatch<AnyAction>;
    setLodingPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GettingPhotos = async ({
    headers,
    id,
    dispatch,
    setLodingPhoto,
}: GettingPhotosProps) => {
    try {
        const response = await api.get(
            `/user-profiles?populate=photo&filters[user][id][$eq]=${id}&sort=datetime:DESC`,
            {
                headers,
            }
        );

        const data: DataPhotos = response.data;
        if (data.data.length > 0) {
            const url = data.data[0].attributes.photo.data.attributes.url;
            dispatch(setUserInfo({ imageProfile: url }));
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLodingPhoto(false);
    }
};

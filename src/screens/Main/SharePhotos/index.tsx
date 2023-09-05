import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import CardImages from './CardImages';
import { ContainerImagesShared, ContainerSharePhotos, ImagePhotos, TitleContainer } from './style';

export interface IImage {
    uri: string;
    isBase64: boolean;
}

interface IPhotos {
    data: {
        side_photo: string;
        back_photo: string;
        front_photo: string;
    };
}

export default function SharePhotos() {
    const [photos, setPhotos] = useState<IPhotos>({
        data: { side_photo: '', back_photo: '', front_photo: '' },
    });
    const [photoImg, setPhotoImg] = useState<IImage[]>([]);
    const [photoSelected, setPhotoSelected] = useState<IImage>();

    const [photosTaken, setPhotosTaken] = useState<IImage[]>([]);

    useEffect(() => {
        const getAsyncPhotos = async () => {
            const getPhotos = await AsyncStorage.getItem('@CrossLifeApp/evolution-photos');
            const getPhotosTaken = await AsyncStorage.getItem('@CrossLifeApp/photos-taken');

            if (getPhotos) {
                setPhotos(JSON.parse(getPhotos));
            }

            if (getPhotosTaken) {
                setPhotosTaken(JSON.parse(getPhotosTaken));
            }
        };
        getAsyncPhotos();
    }, []);

    useEffect(() => {
        if (photoImg.length > 0) {
            setPhotoSelected(photoImg[0]);
        }
    }, [photoImg]);

    useEffect(() => {
        if (!photos.data) {
            return;
        }
        const settingPhotos = () => {
            const { side_photo, back_photo, front_photo } = photos.data;
            const images = [
                { uri: `data:image/jpeg;base64,${side_photo}`, isBase64: true },
                { uri: `data:image/jpeg;base64,${back_photo}`, isBase64: true },
                { uri: `data:image/jpeg;base64,${front_photo}`, isBase64: true },
            ];
            setPhotoImg(images);
        };
        settingPhotos();
    }, [photos]);

    return (
        <ScrollablePageWrapper padding={0} edges={['top', 'left', 'right']}>
            <ContainerSharePhotos>
                {photoSelected && <ImagePhotos source={photoSelected} />}
            </ContainerSharePhotos>
            <ContainerImagesShared>
                <TitleContainer>ALTERAR CARD</TitleContainer>

                <CardImages
                    setPhotos={setPhotoSelected as React.Dispatch<React.SetStateAction<IImage>>}
                    images={photoImg}
                    photosTaken={photosTaken}
                    setPhotosTaken={setPhotosTaken}
                />
            </ContainerImagesShared>
        </ScrollablePageWrapper>
    );
}

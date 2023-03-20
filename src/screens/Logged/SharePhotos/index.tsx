import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        const getAsyncPhotos = async () => {
            const getPhotos = await AsyncStorage.getItem('evolutionPhotos');
            if (getPhotos) {
                setPhotos(JSON.parse(getPhotos));
            }
        };
        getAsyncPhotos();
    }, []);
    // console.log(photos.data.side_photo);

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
                {photoImg.length > 1 && <ImagePhotos source={photoImg[0]} />}
            </ContainerSharePhotos>
            <ContainerImagesShared>
                <TitleContainer>ALTERAR CARD</TitleContainer>

                <CardImages images={photoImg} />
            </ContainerImagesShared>
        </ScrollablePageWrapper>
    );
}

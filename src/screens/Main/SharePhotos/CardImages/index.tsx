import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IImage } from '..';
import { Card, CardImage, ContainerImages } from './style';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { pickImage } from '../../PhotoPicks/helpers/pickImage';
import { ConvertToBase64 } from '../../EvolutionPhotoFinish/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface ICardImages {
    images: IImage[];
    setPhotos: React.Dispatch<React.SetStateAction<IImage>>;
    photosTaken: IImage[];
    setPhotosTaken: React.Dispatch<React.SetStateAction<IImage[]>>;
}

const CardImages = ({ images, setPhotos, photosTaken, setPhotosTaken }: ICardImages) => {
    const { colors } = useTheme();
    const handleCameraOpen = async () => {
        const res = await pickImage();

        const convertedBase64Image = await ConvertToBase64(res as string);

        const newImage = {
            uri: `data:image/jpeg;base64,${convertedBase64Image}`,
            isBase64: true,
        };
        const photoStorage = [...photosTaken, newImage];

        const photoStorageString = JSON.stringify(photoStorage);
        await AsyncStorage.setItem('@CrossLifeApp/photos-taken', photoStorageString);

        setPhotosTaken(prev => [newImage, ...prev]);
    };

    return (
        <ContainerImages>
            <TouchableOpacity onPress={handleCameraOpen}>
                <Card>
                    <AntDesign name="camera" size={40} color={colors.green[700]} />
                </Card>
            </TouchableOpacity>
            {photosTaken.map((image, index) => (
                <Fragment key={index}>
                    <TouchableOpacity
                        onPress={() => {
                            setPhotos(image);
                        }}>
                        <Card>
                            <CardImage source={image} />
                        </Card>
                    </TouchableOpacity>
                </Fragment>
            ))}
            {images.map((image, index) => (
                <Fragment key={index}>
                    <TouchableOpacity
                        onPress={() => {
                            setPhotos(image);
                        }}>
                        <Card>
                            <CardImage source={image} />
                        </Card>
                    </TouchableOpacity>
                </Fragment>
            ))}
        </ContainerImages>
    );
};

export default CardImages;

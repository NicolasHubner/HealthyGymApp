import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { PickImageProps } from '..';
import { pickImage, setImageFromCamera, TumbleType } from '../helpers/pickImage';
import {
    ImageWoman,
    ModalBlur,
    ModalContainer,
    TextButton,
    TitleModal,
    ViewButton,
    ViewTextsButton,
} from './style';

interface ModalPhotoProps {
    photo: string;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPickedImagePath: React.Dispatch<React.SetStateAction<PickImageProps>>;
    type: TumbleType;
    setIsPicked: React.Dispatch<React.SetStateAction<TumbleType>>;
    setModalPhoto: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalPhoto({
    photo,
    setModal,
    setPickedImagePath,
    type,
    setIsPicked,
    setModalPhoto,
}: ModalPhotoProps) {
    const { colors } = useTheme();
    const setType = (types: TumbleType) => {
        switch (types) {
            case TumbleType.perfil:
                setIsPicked(TumbleType.frent);
                break;
            case TumbleType.frent:
                setIsPicked(TumbleType.background);
                break;
            case TumbleType.background:
                setIsPicked(TumbleType.final);
                break;
        }
    };
    const openCamera = async () => {
        const newPhoto = await pickImage();
        setModalPhoto(newPhoto as string);
    };

    return (
        <ModalBlur>
            <ModalContainer>
                <ImageWoman source={{ uri: photo }} />

                <ViewTextsButton>
                    <TitleModal>Vamos usar essa foto?</TitleModal>

                    <TouchableOpacity
                        onPress={() => {
                            setModal(false);
                            setImageFromCamera({
                                image: photo,
                                setPicked: setPickedImagePath,
                                type,
                            });
                            setType(type);
                        }}>
                        <ViewButton backgroundColor={colors.green[500]} border={false}>
                            <TextButton color={colors.white}>Vou usar essa</TextButton>
                        </ViewButton>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            openCamera();
                        }}>
                        <ViewButton border={true}>
                            <TextButton color={colors.green[500]}>
                                Não curi, vou tirar outra
                            </TextButton>
                        </ViewButton>
                    </TouchableOpacity>
                </ViewTextsButton>
            </ModalContainer>
        </ModalBlur>
    );
}

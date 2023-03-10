import React, { useCallback, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import {
    ButtonsPhoto,
    ContainerPhotoPicker,
    ContainerTumbleButton,
    SubTitlePhotoPicker,
    TextButton,
    TitlePhotoPicker,
    ViewImage,
} from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShowPhotos from './showPhotos';
import { pickImage, TumbleType } from './helpers/pickImage';
import { textTitle } from './helpers/textTitle';
import { ScrollView } from 'react-native';
import BodyWoman from '@/assets/svg/bodywoman.svg';
import FrontWoman from '@/assets/svg/frontwoman.svg';
import BackWoman from '@/assets/svg/backwoman.svg';
import { Modal } from 'react-native';
import ModalPhoto from './ModalPhoto';

export interface PickImageProps {
    perfil: string;
    frente: string;
    costas: string;
}
const initialState: PickImageProps = {
    perfil: '',
    frente: '',
    costas: '',
};

export default function PhotosPicks() {
    const [ref, setRef] = useState<ScrollView | null>(null);
    const [modal, setModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState<string>('');
    const handleScrollToTop = useCallback((refs: ScrollView | null) => {
        refs?.scrollTo({ x: 0, y: 0, animated: true });
    }, []);

    const [pickedImagePath, setPickedImagePath] = useState(initialState);
    const [isPicked, setIsPicked] = useState(TumbleType.perfil);

    const handleButtonContinue = async () => {
        if (isPicked === TumbleType.final) {
            console.log('Final');
            return;
        }
        const photo = await pickImage();
        // console.log(photo);
        if (photo) {
            setModalPhoto(photo as string);
            setModal(true);
            handleScrollToTop(ref);
        }
    };

    return (
        <ScrollablePageWrapper setRef={setRef} padding={0} edges={['left', 'right']}>
            <ContainerPhotoPicker final={isPicked === TumbleType.final}>
                <TitlePhotoPicker>{textTitle({ type: isPicked }).title}</TitlePhotoPicker>

                <SubTitlePhotoPicker>{textTitle({ type: isPicked }).subtitle}</SubTitlePhotoPicker>

                {isPicked !== TumbleType.final && (
                    <ViewImage>
                        {isPicked === TumbleType.perfil && <BodyWoman width={400} height={400} />}
                        {isPicked === TumbleType.frent && <FrontWoman width={400} height={400} />}
                        {isPicked === TumbleType.background && (
                            <BackWoman width={400} height={400} />
                        )}
                    </ViewImage>
                )}
            </ContainerPhotoPicker>

            <ContainerTumbleButton>
                <ShowPhotos
                    setPickedImagePath={setPickedImagePath}
                    pickedImagePath={pickedImagePath}
                />

                <TouchableOpacity onPress={handleButtonContinue}>
                    <ButtonsPhoto>
                        <TextButton>
                            {isPicked === TumbleType.final ? 'Finalizar' : 'Continuar'}
                        </TextButton>
                    </ButtonsPhoto>
                </TouchableOpacity>
            </ContainerTumbleButton>

            <Modal animationType="slide" transparent={true} visible={modal}>
                <ModalPhoto
                    type={isPicked}
                    setPickedImagePath={setPickedImagePath}
                    setModal={setModal}
                    photo={modalPhoto}
                    setIsPicked={setIsPicked}
                    setModalPhoto={setModalPhoto}
                />
            </Modal>
        </ScrollablePageWrapper>
    );
}

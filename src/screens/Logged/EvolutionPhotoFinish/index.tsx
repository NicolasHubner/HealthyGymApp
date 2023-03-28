import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import BgImage from '@/assets/svg/bgimage.svg';
import { Dimensions, TouchableOpacity } from 'react-native';
import { ButtonsPhoto, ContainerTop, MedalImage, SubtitleFinish, TextButton, Title } from './style';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
import { ConvertToBase64 } from './helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPhotoData {
    data: {
        user: string | number;
        datetime: string;
        side_photo: string;
        front_photo: string;
        back_photo: string;
    };
}

export default function FinishEvolution() {
    const { params } = useRoute();

    const { width, height } = Dimensions.get('window');

    const navigator = useNavigation() as INavigation;

    const { id: userId, token } = useSelector((state: RootState) => state.user);

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    // console.log(token);

    const handleConfirmations = async () => {
        const { pickedImagePath } = params as any;
        const { perfil, frente, costas } = pickedImagePath;

        try {
            if (!perfil || !frente || !costas)
                throw new Error(
                    `Alguma das fotos não foi cadastrada corretamente: \nPerfil: ${perfil} \nFrente: ${frente} \nCostas:${costas}`
                );

            const photosData: IPhotoData = {
                data: {
                    user: userId as number,
                    datetime: new Date().toISOString(),
                    side_photo: await ConvertToBase64(perfil),
                    front_photo: await ConvertToBase64(frente),
                    back_photo: await ConvertToBase64(costas),
                },
            };

            await api.post('/evolution-photos', photosData, {
                headers,
            });

            await AsyncStorage.setItem(
                '@CrossLifeApp/evolution-photos',
                JSON.stringify(photosData)
            );

            throwSuccessToast({
                title: 'Fotos de evolução cadastradas',
                message: 'Suas fotos evolução foi concluída com sucesso',
            });
            navigator.navigate('Home');
        } catch (err) {
            console.error('Ocorreu um erro ao cadastrar as fotos de evolução', err);
            throwErrorToast({
                title: 'Erro',
                message: 'Ocorreu um erro ao enviar suas fotos de evolução. Tente novamente!',
            });
        }
    };
    return (
        <ScrollablePageWrapper padding={0} edges={['left', 'right']}>
            <ContainerTop>
                <BgImage
                    style={{ position: 'absolute', opacity: 0.7 }}
                    preserveAspectRatio="xMidYMid slice"
                    width={width}
                    height={height}
                />

                <Title>Primeiro passo para o sucesso!</Title>

                <MedalImage
                    source={require('@/assets/PhotoScreen/Medal.png')}
                    // resizeMode="contain"
                />

                <SubtitleFinish>
                    Você ganhou sua primeira medalha por concluir seu perfil.
                </SubtitleFinish>

                <TouchableOpacity onPress={handleConfirmations}>
                    <ButtonsPhoto>
                        <TextButton>Continuar</TextButton>
                    </ButtonsPhoto>
                </TouchableOpacity>
            </ContainerTop>
        </ScrollablePageWrapper>
    );
}

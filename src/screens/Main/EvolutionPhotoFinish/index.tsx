import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React, { useState } from 'react';
import BgImage from '@/assets/svg/bgimage.svg';
import { ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { ButtonsPhoto, ContainerTop, MedalImage, SubtitleFinish, TextButton, Title } from './style';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
// import { ConvertToBase64 } from './helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { RouteNames } from '@/routes/routes_names';

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
    const [loading, setLoading] = useState(false);

    const { navigate } = useNavigation<INavigation>();

    const { id: userId, token } = useSelector((state: RootState) => state.user);

    const handleConfirmations = async () => {
        setLoading(true);
        try {
            const { pickedImagePath } = params as any;
            const { perfil, frente, costas } = pickedImagePath;

            if (!perfil || !frente || !costas)
                throw new Error(
                    `Alguma das fotos não foi cadastrada corretamente: \nPerfil: ${perfil} \nFrente: ${frente} \nCostas:${costas}`
                );

            const formData = new FormData();
            const perfilBlob = await fetch(perfil).then(r => r.blob());
            const frenteBlob = await fetch(frente).then(r => r.blob());
            const costasBlob = await fetch(costas).then(r => r.blob());

            const photosData = {
                user: userId as number,
                datetime: new Date().toISOString(),
            };
            formData.append('files.side_photo', {
                uri: perfil,
                name: `${userId}-perfil-${perfilBlob.size}.${perfilBlob.type.replace(
                    'image/',
                    ''
                )}`,
                type: perfilBlob.type,
            } as any);
            formData.append('files.front_photo', {
                uri: frente,
                name: `${userId}-frente-${frenteBlob.size}.${frenteBlob.type.replace(
                    'image/',
                    ''
                )}`,
                type: frenteBlob.type,
            } as any);
            formData.append('files.back_photo', {
                uri: costas,
                name: `${userId}-costas-${costasBlob.size}.${costasBlob.type.replace(
                    'image/',
                    ''
                )}`,
                type: costasBlob.type,
            } as any);

            formData.append('data', JSON.stringify(photosData));

            const headers = generateAuthHeaders(token!, {
                'Content-Type': 'multipart/form-data',
                Accept: '*/*',
            });

            await api.post('/evolution-photo-v2s', formData, {
                headers,
            });

            throwSuccessToast({
                title: 'Fotos de evolução cadastradas',
                message: 'Suas fotos evolução foi concluída com sucesso',
            });

            navigate(RouteNames.logged.home);
        } catch (err) {
            console.error('Ocorreu um erro ao cadastrar as fotos de evolução', err);
            throwErrorToast({
                title: 'Erro',
                message: 'Ocorreu um erro ao enviar suas fotos de evolução. Tente novamente!',
            });
        } finally {
            setLoading(false);
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

                <TouchableOpacity disabled={loading} onPress={handleConfirmations}>
                    <ButtonsPhoto>
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <TextButton>Continuar</TextButton>
                        )}
                    </ButtonsPhoto>
                </TouchableOpacity>
            </ContainerTop>
        </ScrollablePageWrapper>
    );
}

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import { ContainerScrollPhotos, ImagesEvolutions, SubTitleComparation } from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';

export default function PhotoComparation() {
    interface IRoute {
        params: {
            evolutionPhotoBefore: EvolutionPhotoHistory;
            evolutionPhotoAfter: EvolutionPhotoHistory;
        };
    }
    const { params } = useRoute() as IRoute;

    const { goBack } = useNavigation<FineShapeScreenNavigation>();

    const { evolutionPhotoBefore, evolutionPhotoAfter } = params;

    const imagesBefore = [
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore.attributes?.front_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore.attributes?.side_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore.attributes?.back_photo}`,
            isBase64: true,
        },
    ];

    const imagesAfter = [
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter.attributes?.front_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter.attributes?.side_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter.attributes?.back_photo}`,
            isBase64: true,
        },
    ];

    return (
        <ScrollablePageWrapper edges={['top']}>
            <View style={{ width: '100%', paddingVertical: 12 }}>
                <HeaderGoBackButton canGoBack onPress={() => goBack()} />
            </View>

            {evolutionPhotoAfter ? (
                <>
                    <SubTitleComparation>Frente</SubTitleComparation>
                    <ImagesEvolutions source={imagesBefore[0]} />
                    <SubTitleComparation>Costas</SubTitleComparation>
                    <ImagesEvolutions source={imagesBefore[1]} />
                    <SubTitleComparation>Perfil</SubTitleComparation>
                    <ImagesEvolutions source={imagesBefore[2]} />
                </>
            ) : (
                <>
                    <SubTitleComparation>Frente</SubTitleComparation>
                    <ContainerScrollPhotos>
                        <ImagesEvolutions source={imagesBefore[0]} />
                        <ImagesEvolutions source={imagesAfter[0]} />
                    </ContainerScrollPhotos>
                    <SubTitleComparation>Costas</SubTitleComparation>
                    <ContainerScrollPhotos>
                        <ImagesEvolutions source={imagesBefore[1]} />
                        <ImagesEvolutions source={imagesAfter[1]} />
                    </ContainerScrollPhotos>
                    <SubTitleComparation>Perfil</SubTitleComparation>
                    <ContainerScrollPhotos>
                        <ImagesEvolutions source={imagesBefore[2]} />
                        <ImagesEvolutions source={imagesAfter[2]} />
                    </ContainerScrollPhotos>
                </>
            )}
        </ScrollablePageWrapper>
    );
}

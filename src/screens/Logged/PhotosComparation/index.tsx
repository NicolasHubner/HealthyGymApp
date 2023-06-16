import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React, { useCallback, useMemo, useState } from 'react';
import { TabIndicator, TabsContainer, TabText } from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { Pressable, View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { TabComponent } from './components/TabComponent';
interface IRoute {
    params: {
        evolutionPhotoBefore: EvolutionPhotoHistory;
        evolutionPhotoAfter: EvolutionPhotoHistory;
    };
}

const tabs = ['Frente', 'Lado', 'Costas'];

export default function PhotoComparation() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const { params } = useRoute() as IRoute;
    const { goBack } = useNavigation<FineShapeScreenNavigation>();

    const { evolutionPhotoBefore, evolutionPhotoAfter } = params;

    // const generateBase64Images = (evolutionPhoto: EvolutionPhotoHistory) => {
    //     return ['front_photo', 'side_photo', 'back_photo'].map((item: any) => ({
    //         // @ts-ignore
    //         uri: `data:image/jpeg;base64,${evolutionPhoto?.attributes?.[item]}`,
    //         isBase64: true,
    //     }));
    // };
    // const generatePhotosFromBucket = (evolutionPhoto: EvolutionPhotoHistory) => {
    //     return ['front_photo', 'side_photo', 'back_photo'].map((item: any) => ({
            
    // console.log('evolutionPhotoBefore', evolutionPhotoBefore.attributes?.back_photo?.);
    const photoUrls = (evolutionPhoto: EvolutionPhotoHistory) => {
        return [
            evolutionPhoto.attributes?.front_photo?.data.attributes.url,
            evolutionPhoto.attributes?.side_photo?.data.attributes.url,
            evolutionPhoto.attributes?.back_photo?.data.attributes.url,
        ]
    };

    // console.log(evolutionPhotoBefore);
    // const imagesBefore = useMemo(
    //     () => generateBase64Images(evolutionPhotoBefore),
    //     [evolutionPhotoBefore]
    // );

    const imagesBefore = useMemo(
        () => photoUrls(evolutionPhotoBefore),
        [evolutionPhotoBefore]
    );
    // console.log('images', images);
    const imagesAfter = useMemo(
        () => {
            if (evolutionPhotoAfter) {
                return photoUrls(evolutionPhotoAfter);
            }
            return [];
        }
        ,
        [evolutionPhotoAfter]
    );
        // console.log(imagesAfter);
    return (
        <ScrollablePageWrapper bottomSpacing>
            <View style={{ width: '100%', paddingVertical: 12 }}>
                <HeaderGoBackButton canGoBack onPress={() => goBack()} />
            </View>

            <TabsContainer>
                {tabs.map(tab => (
                    <Pressable onPress={() => setActiveTab(tab)}>
                        <TabIndicator key={tab} selected={tab === activeTab}>
                            <TabText selected={tab === activeTab}>{tab}</TabText>
                        </TabIndicator>
                    </Pressable>
                ))}
            </TabsContainer>

            <View style={{ width: '100%' }}>
                <TabComponent
                    tab={activeTab}
                    evolutionPhotoBefore={evolutionPhotoBefore}
                    evolutionPhotoAfter={evolutionPhotoAfter}
                    imagesBefore={imagesBefore}
                    imagesAfter={imagesAfter}
                />
            </View>
        </ScrollablePageWrapper>
    );
}

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React, { useState } from 'react';
import {
    ContainerScrollPhotos,
    ImagesEvolutions,
    PhotoTakeDate,
    SubTitleComparation,
    TabIndicator,
    TabsContainer,
    TabText,
} from './style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EvolutionPhotoHistory } from '@/types/evolution/Evolution';
import { Pressable, View } from 'react-native';
import { HeaderGoBackButton } from '@/components/molecules/HeaderGoBackButton';
import { FineShapeScreenNavigation } from '@/helpers/interfaces/INavigation';
import { format } from 'date-fns';
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

    const imagesBefore = [
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore?.attributes?.front_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore?.attributes?.side_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoBefore?.attributes?.back_photo}`,
            isBase64: true,
        },
    ];

    const imagesAfter = [
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter?.attributes?.front_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter?.attributes?.side_photo}`,
            isBase64: true,
        },
        {
            uri: `data:image/jpeg;base64,${evolutionPhotoAfter?.attributes?.back_photo}`,
            isBase64: true,
        },
    ];

    const renderTabComponent = (tab: string) => {
        const component: { [key: string]: JSX.Element } = {
            Frente: !evolutionPhotoAfter ? (
                <View>
                    <ImagesEvolutions source={imagesBefore[0]} />
                    <PhotoTakeDate>
                        Foto tirada em{' '}
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                        .
                    </PhotoTakeDate>
                </View>
            ) : (
                <View>
                    <PhotoTakeDate>
                        Antes (
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                        )
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesBefore[0]} />
                    <PhotoTakeDate>
                        Depois (
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoAfter?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                        )
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesAfter[0]} />
                </View>
            ),
            Lado: !evolutionPhotoAfter ? (
                <View>
                    <ImagesEvolutions source={imagesBefore[1]} />
                    <PhotoTakeDate>
                        Foto tirada em{' '}
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                        .
                    </PhotoTakeDate>
                </View>
            ) : (
                <View>
                    <PhotoTakeDate>
                        Antes{' '}
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesBefore[1]} />
                    <PhotoTakeDate>
                        Depois (
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoAfter?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesAfter[1]} />
                </View>
            ),
            Costas: !evolutionPhotoAfter ? (
                <View>
                    <ImagesEvolutions source={imagesBefore[2]} />
                    <PhotoTakeDate>
                        Foto tirada em{' '}
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                        .
                    </PhotoTakeDate>
                </View>
            ) : (
                <View>
                    <PhotoTakeDate>
                        Antes{' '}
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesBefore[2]} />
                    <PhotoTakeDate>
                        Depois (
                        {format(
                            // @ts-ignore
                            new Date(evolutionPhotoAfter?.attributes?.createdAt ?? new Date()),
                            'dd/MM/yyyy'
                        )}
                    </PhotoTakeDate>
                    <ImagesEvolutions source={imagesAfter[2]} />
                </View>
            ),
        };

        return component[tab];
    };

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

            <View style={{ width: '100%' }}>{renderTabComponent(activeTab)}</View>

            {/* {!evolutionPhotoAfter ? (
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
            )} */}
        </ScrollablePageWrapper>
    );
}

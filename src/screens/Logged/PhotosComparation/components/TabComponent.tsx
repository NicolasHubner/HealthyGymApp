import { View } from 'react-native';
import { format } from 'date-fns';

import { ImagesEvolutions, PhotoTakeDate } from '../style';

interface TabComponentProps {
    tab: string;
    evolutionPhotoAfter: any;
    imagesBefore: any;
    imagesAfter: any;
    evolutionPhotoBefore: any;
}

export function TabComponent({
    evolutionPhotoAfter,
    evolutionPhotoBefore,
    imagesAfter,
    imagesBefore,
    tab,
}: TabComponentProps) {
    const component: { [key: string]: JSX.Element } = {
        Frente: !evolutionPhotoAfter ? (
            <View style={{ width: '100%' }}>
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
            <View style={{ width: '100%' }}>
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
            <View style={{ width: '100%' }}>
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
            <View style={{ width: '100%' }}>
                <PhotoTakeDate>
                    Antes (
                    {format(
                        // @ts-ignore
                        new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                        'dd/MM/yyyy'
                    )}
                    )
                </PhotoTakeDate>
                <ImagesEvolutions source={imagesBefore[1]} />
                <PhotoTakeDate>
                    Depois (
                    {format(
                        // @ts-ignore
                        new Date(evolutionPhotoAfter?.attributes?.createdAt ?? new Date()),
                        'dd/MM/yyyy'
                    )}
                    )
                </PhotoTakeDate>
                <ImagesEvolutions source={imagesAfter[1]} />
            </View>
        ),
        Costas: !evolutionPhotoAfter ? (
            <View style={{ width: '100%' }}>
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
            <View style={{ width: '100%' }}>
                <PhotoTakeDate>
                    Antes (
                    {format(
                        // @ts-ignore
                        new Date(evolutionPhotoBefore?.attributes?.createdAt ?? new Date()),
                        'dd/MM/yyyy'
                    )}
                    )
                </PhotoTakeDate>
                <ImagesEvolutions source={imagesBefore[2]} />
                <PhotoTakeDate>
                    Depois (
                    {format(
                        // @ts-ignore
                        new Date(evolutionPhotoAfter?.attributes?.createdAt ?? new Date()),
                        'dd/MM/yyyy'
                    )}
                    )
                </PhotoTakeDate>
                <ImagesEvolutions source={imagesAfter[2]} />
            </View>
        ),
    };

    return component[tab];
}

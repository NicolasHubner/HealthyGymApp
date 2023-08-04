import { View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import ArrowDown from '@/assets/svg/arrow-down.svg';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import * as S from './style';
import { Entypo } from '@expo/vector-icons';
import AvatarImage from '@/assets/no-user.jpg';
import { pickImage } from '../PhotoPicks/helpers/pickImage';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';

interface PhotoAttributes {
    url: string;
}

interface DataAttributes {
    attributes: {
        photo: {
            data: {
                attributes: PhotoAttributes;
            };
        };
    };
}

interface Data {
    data: DataAttributes[];
}

export default function UserPhoto() {
    const [fadeAnim, _] = useState(new Animated.Value(0));

    const { canGoBack, goBack } = useNavigation<INavigation>();

    const { id, token } = useSelector((state: RootState) => state.user);

    const [photo, setPhoto] = useState<string | null>(null);

    const getPhotoUser = useCallback(async () => {
        const uriImage = await pickImage();

        if (uriImage) {
            try {
                const formData = new FormData();

                const blob = await fetch(uriImage).then(r => r.blob());

                const photoData = {
                    user: id as number,
                    datetime: new Date().toISOString(),
                };

                formData.append('files.photo', {
                    uri: uriImage,
                    name: `${id}-perfil-${blob.size}.${blob.type.replace('image/', '')}`,
                    type: blob.type,
                } as any);

                formData.append('data', JSON.stringify(photoData));

                const headers = generateAuthHeaders(token!, {
                    'Content-Type': 'multipart/form-data',
                    Accept: '*/*',
                });

                await api.post('/user-profiles', formData, {
                    headers,
                });

                setPhoto(uriImage);
            } catch (err) {
                console.log(err);
            }
        }
    }, [id, token]);

    // const removePhotoUser = async () => {
    //     try {
    //         const headers = generateAuthHeaders(token!);

    //         await api.delete(`/user-profiles/${id}`, {
    //             headers,
    //         });
    //         setPhoto(null);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const getPhoto = useCallback(async () => {
        const headers = generateAuthHeaders(token!);

        try {
            const response = await api.get(
                `/user-profiles?populate=photo&filters[user][id][$eq]=${id}&sort=datetime:DESC`,
                {
                    headers,
                }
            );

            const data: Data = response.data;
            if (data.data.length > 0) {
                const url = data.data[0].attributes.photo.data.attributes.url;
                setPhoto(url);
            }
        } catch (err) {
            console.log(err);
        }
    }, [id, token, setPhoto]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPhoto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Animated.View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, opacity: fadeAnim }}>
            <S.PageContainerUserPhotos>
                <View
                    style={{
                        position: 'absolute',
                        top: 32,
                        left: 24,
                        zIndex: 10,
                    }}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <ArrowDown />
                    </TouchableOpacity>
                </View>

                <View w={'100%'} alignItems={'center'} justifyContent={'center'} mt={12}>
                    <S.ProfileLogoUserPhoto source={!photo ? AvatarImage : { uri: photo }} />
                </View>

                <TouchableOpacity onPress={getPhotoUser}>
                    <View
                        alignItems={'center'}
                        gap={4}
                        // width={'100%'}
                        backgroundColor={'gray.300'}
                        paddingY={2}
                        paddingX={4}
                        mt={12}
                        borderRadius={8}
                        flexDirection={'row'}>
                        <Entypo name="camera" size={24} color="black" />
                        <S.TextAddOrRemovePhoto>
                            Adicionar ou Alterar Foto de perfil
                        </S.TextAddOrRemovePhoto>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={removePhotoUser}>
                    <View
                        alignItems={'center'}
                        gap={4}
                        mt={4}
                        width={'100%'}
                        backgroundColor={'gray.300'}
                        paddingY={2}
                        paddingX={4}
                        borderRadius={8}
                        flexDirection={'row'}>
                        <FontAwesome name="remove" size={24} color="black" />
                        <S.TextAddOrRemovePhoto>Remover foto de perfil</S.TextAddOrRemovePhoto>
                    </View>
                </TouchableOpacity> */}
            </S.PageContainerUserPhotos>
        </Animated.View>
    );
}

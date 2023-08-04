import { View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import ArrowDown from '@/assets/svg/arrow-down.svg';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import * as S from './style';
import { Entypo } from '@expo/vector-icons';
import AvatarImage from '@/assets/no-user.jpg';
import { pickImage } from '../PhotoPicks/helpers/pickImage';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { setUserInfo } from '@/store/user';
import { useTheme } from 'styled-components';
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

export interface DataPhotos {
    data: DataAttributes[];
}

export default function UserPhoto() {
    const [fadeAnim, _] = useState(new Animated.Value(0));

    const { goBack } = useNavigation<INavigation>();
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);

    const { id, token, imageProfile } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();

    const getPhotoUser = useCallback(async () => {
        const uriImage = await pickImage();

        if (uriImage) {
            try {
                setLoading(true);
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

                dispatch(setUserInfo({ imageProfile: uriImage }));
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
    }, [dispatch, id, token]);

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

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
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
                    {!isLoading && (
                        <S.ProfileLogoUserPhoto
                            source={!imageProfile ? AvatarImage : { uri: imageProfile }}
                        />
                    )}
                    {isLoading && (
                        <ActivityIndicator
                            style={{ height: 240 }}
                            size="large"
                            color={colors.green[500]}
                        />
                    )}
                </View>

                <TouchableOpacity disabled={isLoading} onPress={getPhotoUser}>
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

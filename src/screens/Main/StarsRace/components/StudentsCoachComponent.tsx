import { Image, Text, useTheme, View } from 'native-base';
import { api } from '@/services/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import NoUserImg from '@/assets/no-user.jpg';
import Bronze from '@/assets/svg/bronze.svg';
import Gold from '@/assets/svg/gold.svg';
import Silver from '@/assets/svg/silver.svg';

type StudentsCoachComponentProps = {
    name: string;
    goal_type: string;
    stars: number;
    weight: number;
    id: number;
    index: number;
};

type UserDetailsResponse = {
    data: {
        user_profile: {
            photo: {
                formats: {
                    thumbnail: {
                        url: string;
                    };
                };
            };
        };
    }[];
};

export const StudentsCoachComponent: React.FC<StudentsCoachComponentProps> = ({
    name,
    goal_type,
    stars,
    weight,
    id,
    index,
}: StudentsCoachComponentProps) => {
    const { token } = useSelector((state: RootState) => state.user);

    const [image, setImageThumbnail] = useState<string | null>(null);

    const { colors } = useTheme();

    const fetchImageThumbnail = useCallback(async () => {
        try {
            const headers = generateAuthHeaders(token!);
            const { data } = (await api.get(
                `/users?filters[id]=${id}&populate[user_profile][populate]=photo.media`,
                {
                    headers,
                }
            )) as UserDetailsResponse;

            if (data && data.length > 0 && data[0].user_profile) {
                setImageThumbnail(data[0].user_profile.photo.formats.thumbnail.url);
            }
        } catch (error) {
            console.error('Error fetching image thumbnail:', error);
        }
    }, [token, id]);

    useEffect(() => {
        fetchImageThumbnail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View
            borderRadius={12}
            px={4}
            py={2}
            flexDir={'row'}
            alignItems={'center'}
            w={'90%'}
            maxW={'90%'}
            my={2}
            shadow={2}
            bgColor={'white'}>
            <Image
                source={image ? { uri: image } : NoUserImg}
                alt={name}
                w={12}
                h={12}
                mr={4}
                borderRadius={10}
            />
            <View flexGrow={1} flexDirection={'column'} alignItems={'flex-start'}>
                <Text fontSize={16} fontWeight={500}>
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                </Text>

                <Text fontSize={12}>{stars} pontos</Text>
            </View>
            <View alignItems={'center'} justifyContent={'center'}>
                {/*<AntDesign name="staro" size={56} color={colors.yellow[300]} />*/}
                {/*<Text*/}
                {/*    position={'absolute'}*/}
                {/*    alignSelf={'center'}*/}
                {/*    fontWeight={500}*/}
                {/*    pt={1}*/}
                {/*    fontSize={'18px'}*/}
                {/*    textTransform={'uppercase'}>*/}
                {/*    {stars}*/}
                {/*</Text>*/}
                {index === 0 && <Gold width={40} height={40} />}
                {index === 1 && <Silver width={40} height={40} />}
                {index === 2 && <Bronze width={40} height={40} />}
            </View>
        </View>
    );
};

import { useState } from 'react';
import { Pressable, View } from 'native-base';

import NoUserImg from '@/assets/no-user.jpg';

import { ExpandedInfo } from './components/ExpandedInfo';
import { StudentUsername } from '@/components/atoms/StudentUsername';

import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';
import { getUserGoalName } from '@/helpers/constants/goals';

import {
    Wrapper,
    Image,
    Info,
    Name,
    ObjectiveLabel,
    ObjectiveValue,
    UserLevel,
    Divider,
} from './styles';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface StudentCardProps {
    user: IStudentCardUser;
}

export function StudentCard({ user }: StudentCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandeUserInfo = () => {
        setIsExpanded(current => !current);
    };

    const sendWhatsappMessage = async () => {
        const suported = await Linking.canOpenURL(
            `https://wa.me/55${user.phone}?text=Ola%2C+${user.name}...`
        );

        if (suported) {
            await Linking.openURL(`https://wa.me/55${user.phone}?text=Ola%2C+${user.name}...`);
        } else {
            console.error('Não foi possível abrir o link');
        }
    };

    const navigator = useRoute();
    return (
        <Wrapper>
            <View
                flexDir={'row'}
                height={'120px'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                paddingLeft={2}
                // paddingRight={4}
                paddingTop={2}
                gap={2}>
                <Pressable onPress={handleExpandeUserInfo} w={'80%'} flexDir={'row'}>
                    <Image source={user.imageProfile ? { uri: user.imageProfile } : NoUserImg} />

                    <Info>
                        <Name>{user?.name ?? 'Usuário'}</Name>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 4,
                                marginTop: 'auto',
                                alignItems: 'center',
                            }}>
                            <ObjectiveLabel>Objetivo:</ObjectiveLabel>
                            <ObjectiveValue>{getUserGoalName(user?.objective)}</ObjectiveValue>
                        </View>
                        <StudentUsername
                            userName={user.username ?? 'usuario'}
                            verified={user.isVerified}
                            isUsingApp={user.isUsingApp}
                            navigatorName={navigator.name}
                        />
                    </Info>
                </Pressable>

                <TouchableOpacity onPress={sendWhatsappMessage}>
                    <View flexDir={'row'} h={'100%'}>
                        <Divider />
                        <UserLevel>
                            {/* <LevelTitle>Nível</LevelTitle>
                        <LevelValueContainer>
                        <LevelValue>{user?.level ?? 0}</LevelValue>
                    </LevelValueContainer> */}
                            <FontAwesome5 name="whatsapp" size={40} color="#25D366" />
                        </UserLevel>
                    </View>
                </TouchableOpacity>
            </View>
            {/* </View> */}

            <ExpandedInfo isExpanded={isExpanded} user={user} />
        </Wrapper>
    );
}

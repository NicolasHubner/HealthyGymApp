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

interface StudentCardProps {
    user: IStudentCardUser;
}

export function StudentCard({ user }: StudentCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandeUserInfo = () => {
        setIsExpanded(current => !current);
    };

    const navigator = useRoute();
    return (
        <Wrapper>
            {/* <View> */}
            <View
                // onPress={handleExpandeUserInfo}
                flexDir={'row'}
                height={'120px'}
                alignItems={'center'}
                justifyContent={'flex-start'}
                paddingLeft={4}
                // paddingRight={4}
                paddingTop={2}
                gap={4}>
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
                        <View>
                            <StudentUsername
                                userName={user.username ?? 'usuario'}
                                verified={user.isVerified}
                                isUsingApp={user.isUsingApp}
                                navigatorName={navigator.name}
                            />
                        </View>
                    </Info>
                </Pressable>

                <Pressable flexDir={'row'} h={'100%'}>
                    <Divider />
                    <UserLevel>
                        {/* <LevelTitle>Nível</LevelTitle>
                        <LevelValueContainer>
                        <LevelValue>{user?.level ?? 0}</LevelValue>
                    </LevelValueContainer> */}
                        <FontAwesome5 name="whatsapp" size={40} color="#25D366" />
                    </UserLevel>
                </Pressable>
            </View>
            {/* </View> */}

            <ExpandedInfo isExpanded={isExpanded} user={user} />
        </Wrapper>
    );
}

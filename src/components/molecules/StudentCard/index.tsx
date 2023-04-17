import { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AvatarMascImg from '@/assets/avatar_masc.png';
import AvatarFemImg from '@/assets/Avatar.png';

import { ExpandedInfo } from './components/ExpandedInfo';
import { StudentUsername } from '@/components/atoms/StudentUsername';

import { IStudentCardUser } from '@/helpers/interfaces/IStudentCard';
import { getUserGoalName } from '@/helpers/constants/goals';

import {
    Wrapper,
    Container,
    Divider,
    Image,
    Info,
    LevelValueContainer,
    LevelTitle,
    LevelValue,
    Name,
    ObjectiveLabel,
    ObjectiveValue,
    UserLevel,
} from './styles';

interface StudentCardProps {
    user: IStudentCardUser;
}

export function StudentCard({ user }: StudentCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandeUserInfo = () => {
        setIsExpanded(current => !current);
    };

    return (
        <Wrapper>
            <TouchableOpacity onPress={handleExpandeUserInfo}>
                <Container>
                    <Image source={user?.gender === 'M' ? AvatarMascImg : AvatarFemImg} />

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
                        <View style={{ marginTop: 'auto' }}>
                            <StudentUsername name={user.username ?? 'usuario'} />
                        </View>
                    </Info>

                    <Divider />

                    <UserLevel>
                        <LevelTitle>Nível</LevelTitle>
                        <LevelValueContainer>
                            {/* <LevelValue>{user.level ?? 0}</LevelValue> */}
                            <LevelValue>{user?.level ?? 0}</LevelValue>
                        </LevelValueContainer>
                    </UserLevel>
                </Container>
            </TouchableOpacity>

            <ExpandedInfo isExpanded={isExpanded} user={user} />

            {/* {isExpanded && <ExpandedInfo />} */}
        </Wrapper>
    );
}

import CheckedIconImg from '@/assets/svg/check.svg';

import { Foundation } from '@expo/vector-icons';

import { Container, Username } from './styles';
import { View, Text } from 'native-base';

interface StudentUsernameProps {
    name: string;
    verified?: boolean;
    isUsingApp?: boolean;
    navigatorName?: string;
}
export function StudentUsername({
    name,
    verified = true,
    isUsingApp,
    navigatorName,
}: StudentUsernameProps) {
    if (!name) return <></>;

    return (
        <>
            <Container>
                <Username>{name}</Username>
                {verified && <CheckedIconImg />}
                {!verified && <Foundation name="alert" size={16} color="red" />}
            </Container>
            {verified && (
                <View w={'100%'}>
                    <Text
                        textAlign={navigatorName === 'CoachStudents' ? null : 'center'}
                        color={isUsingApp ? 'green.500' : 'red.500'}>
                        {isUsingApp ? 'Usuário está ativo' : 'Usuário está inativo'}
                    </Text>
                </View>
            )}
        </>
    );
}

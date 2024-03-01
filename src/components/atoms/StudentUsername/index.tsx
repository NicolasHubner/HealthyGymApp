import CheckedIconImg from '@/assets/svg/check.svg';

import { Foundation } from '@expo/vector-icons';

import { Container, Username } from './styles';
import { View, Text } from 'native-base';

interface StudentUsernameProps {
    userName: string;
    verified?: boolean;
    isUsingApp?: boolean;
    navigatorName?: string;
}
export function StudentUsername({
    userName,
    verified = true,
    isUsingApp,
    navigatorName,
}: StudentUsernameProps) {
    if (!userName) return <></>;

    return (
        <>
            <Container>
                <Username>{userName}</Username>
                {verified && <CheckedIconImg />}
                {!verified && <Foundation name="alert" size={16} color="red" />}
            </Container>
            {/* <View w={'20%'}> */}
            {verified && (
                <View
                    w={'180px'}
                    alignItems={'center'}
                    borderRadius={8}
                    mt={2}
                    paddingX={2}
                    backgroundColor={isUsingApp ? 'green.500' : 'red.500'}>
                    <Text
                        fontSize={12}
                        textAlign={navigatorName === 'CoachStudents' ? null : 'center'}
                        color={'white'}>
                        {isUsingApp ? 'Usuário está ativo' : 'Usuário está inativo'}
                    </Text>
                </View>
            )}
            {!verified && (
                <View
                    w={'180px'}
                    alignItems={'center'}
                    borderRadius={8}
                    mt={2}
                    paddingX={2}
                    backgroundColor={'gray.500'}>
                    <Text
                        fontSize={12}
                        textAlign={navigatorName === 'CoachStudents' ? null : 'center'}
                        color={'white'}>
                        Usuário não verificado
                    </Text>
                </View>
            )}
            {/* </View> */}
        </>
    );
}

import { Text, useTheme } from 'native-base';

export function Subtitle() {
    const { colors } = useTheme();

    return (
        <>
            <Text
                alignSelf={'center'}
                pl={4}
                mt={24}
                fontWeight={500}
                letterSpacing={2}
                fontSize={'16px'}
                textTransform={'uppercase'}
                color={colors.green[600]}
                textAlign={'center'}>
                Corrida das Estrelas
            </Text>

            <Text
                alignSelf={'center'}
                pl={4}
                fontWeight={500}
                w={'80%'}
                my={2}
                lineHeight={24}
                fontSize={'18px'}
                color={colors.black}
                textAlign={'center'}>
                Veja como seus alunos estão se saindo neste desafio
            </Text>
        </>
    );
}

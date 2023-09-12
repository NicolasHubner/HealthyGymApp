import { useTheme } from 'styled-components';
import { Text, View, Image } from 'native-base';
import ArrowRight from '@/assets/svg/Suplement/arrowRight.svg';

interface ISendSugestion {
    studentImage: string;
    suplementImage: string;
    nameSuplement: string;
    nameStudent: string;
}

export const SendSugestion = ({
    studentImage,
    suplementImage,
    nameSuplement,
    nameStudent,
}: ISendSugestion) => {
    const { colors } = useTheme();

    return (
        <View w={'100%'} px={1} py={1} mt={16}>
            <Text fontSize="20px" fontWeight="500" w={'90%'} mb="8" color="gray.500">
                Enviamos a sugestão para <Text color={colors.green[700]}>{nameStudent}!</Text>
            </Text>

            <View
                w={'100%'}
                h={'120px'}
                borderRadius={16}
                bgColor={'#FFFFFF'}
                shadow={2}
                alignItems={'center'}
                flexDir={'row'}
                justifyContent={'flex-start'}>
                <Image
                    source={{ uri: suplementImage }}
                    alt={'Suplemento'}
                    w="95px"
                    h="95px"
                    borderRadius={16}
                    mx={1}
                />

                <View w={'35%'} height={'auto'} mr={2}>
                    <Text fontSize="14px" fontWeight="500" color="gray.500" flexWrap={'wrap'}>
                        {nameSuplement}
                    </Text>
                </View>

                <ArrowRight width={32} height={24} />

                <Image
                    source={{ uri: studentImage }}
                    alt={'Aluno'}
                    w="72px"
                    h="72px"
                    borderRadius={16}
                    ml={2}
                />
            </View>
        </View>
    );
};

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { DailyCalendar } from '@/components/organisms/DailyCalendar';
import { Text, useTheme, View } from 'native-base';

export default function StarRace() {
    const { colors } = useTheme();
    return (
        <ScrollablePageWrapper edges={['left', 'right']} padding={0}>
            <View
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                pt={20}
                bgColor={'green.500'}>
                <DailyCalendar />
            </View>
            <Text
                alignSelf={'flex-start'}
                pl={4}
                mt={4}
                fontWeight={500}
                letterSpacing={2}
                fontSize={'18px'}
                textTransform={'uppercase'}
                color={colors.green[700]}
                textAlign={'left'}>
                Corrida das Estrelas
            </Text>

            <Text
                alignSelf={'flex-start'}
                pl={4}
                fontWeight={500}
                w={'90%'}
                mt={2}
                lineHeight={24}
                fontSize={'18px'}
                color={colors.black}
                textAlign={'left'}>
                Veja como seus alunos estão se saindo neste desafio
            </Text>
        </ScrollablePageWrapper>
    );
}

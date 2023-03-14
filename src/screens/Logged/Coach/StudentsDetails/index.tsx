import { View } from 'react-native';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Header } from '@/components/organisms/Header';

import { StudentInfo } from './components/StudentInfo';
import { SuggestionCarrousel } from '@/components/organisms/SuggestionCarrousel';
import { MetricsInfographic } from '@/components/organisms/MetricsInfographic';
import { DailyCalendar } from '@/components/organisms/DailyCalendar';
import { Notions } from './components/Notions';
import { useTheme } from 'styled-components';

export function StudentsDetails() {
    const { colors } = useTheme();

    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 28, paddingTop: 24 }}>
                <Header />
            </View>

            <StudentInfo />

            <View>
                <DailyCalendar />
            </View>

            <View style={{ width: '100%', backgroundColor: colors.white }}>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                        marginTop: 28,
                    }}>
                    <MetricsInfographic />
                </View>

                <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 44 }}>
                    <Notions />
                </View>
            </View>

            <View style={{ marginVertical: 44 }}>
                <SuggestionCarrousel />
            </View>
        </ScrollablePageWrapper>
    );
}

import { View } from 'react-native';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Header } from '@/components/organisms/Header';

import { StudentInfo } from './components/StudentInfo';

export function StudentsDetails() {
    return (
        <ScrollablePageWrapper bottomSpacing padding={0}>
            <View style={{ paddingHorizontal: 28, paddingTop: 24 }}>
                <Header />
            </View>

            <StudentInfo />
        </ScrollablePageWrapper>
    );
}

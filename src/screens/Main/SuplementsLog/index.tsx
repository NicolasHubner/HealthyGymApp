import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { SuplementsRoute } from '@/types/route/Route';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SendSugestion } from './SendSugestion';
import { HistoricGeneral } from './HistoricGeneral';
import { useLayoutEffect, useMemo } from 'react';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { TouchableOpacity } from 'react-native';
import ArrowLeft from '@/assets/svg/arrow-left.svg';
import { useTheme } from 'styled-components';
import { RouteNames } from '@/routes/routes_names';
export default function SuplementsLog() {
    const navigator = useNavigation() as INavigation;

    const { colors } = useTheme();

    const headereBackButton = useMemo(
        () => (
            <TouchableOpacity
                style={{ backgroundColor: colors.green[500], borderRadius: 50, padding: 4 }}
                onPress={() => {
                    navigator.navigate(RouteNames.logged.home);
                }}>
                <ArrowLeft />
            </TouchableOpacity>
        ),
        [colors.green, navigator]
    );

    useLayoutEffect(() => {
        navigator.setOptions({
            headerLeft: () => headereBackButton,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { params } = useRoute() as SuplementsRoute;

    console.log(JSON.stringify(params, null, 2));

    return (
        <ScrollablePageWrapper edges={['top', 'left', 'right']} bottomSpacing={64}>
            {params && params.dataStudent && (
                <SendSugestion
                    studentImage={params.dataStudent.imageStudent || ''}
                    suplementImage={params.dataSuplement.image}
                    nameSuplement={params.dataSuplement.name}
                    nameStudent={params.dataStudent.nameStudent || ''}
                />
            )}

            <HistoricGeneral />
        </ScrollablePageWrapper>
    );
}

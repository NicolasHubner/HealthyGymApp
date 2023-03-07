import { scale } from 'react-native-size-matters';
import { BaseToast, BaseToastProps, ErrorToast, InfoToast } from 'react-native-toast-message';

import { lightTheme as theme } from '@/styles/theme';

export const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: theme.colors.blue_metal[500] }}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            text1Style={{
                fontSize: scale(12),
                fontFamily: theme.font_family.bold,
                color: theme.colors.gray[500],
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17,
            }}
            text2Style={{
                fontSize: 15,
            }}
        />
    ),
    warning: (props: BaseToastProps) => (
        <InfoToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
            }}
        />
    ),
};

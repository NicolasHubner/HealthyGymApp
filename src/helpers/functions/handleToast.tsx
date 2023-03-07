import Toast from 'react-native-toast-message';

import { Toast as LocalToast } from '@/components/molecules/Toast';

interface ThrowToastProps {
    title: string;
    message: string;
    showTime?: number;
}

export const toastConfig = {
    success: ({ text1, text2 }: any) => <LocalToast title={text1} text={text2} type="success" />,
    warning: ({ text1, text2 }: any) => <LocalToast title={text1} text={text2} type="warning" />,
    error: ({ text1, text2 }: any) => <LocalToast title={text1} text={text2} type="error" />,
};

export function throwSuccessToast({ title, message, showTime = 5000 }: ThrowToastProps) {
    Toast.show({
        type: 'success',
        text1: title,
        text2: message,
        visibilityTime: showTime,
    });
}

export function throwWarningToast({ title, message, showTime = 5000 }: ThrowToastProps) {
    Toast.show({
        type: 'warning',
        text1: title,
        text2: message,
        visibilityTime: showTime,
    });
}

export function throwErrorToast({ title, message, showTime = 5000 }: ThrowToastProps) {
    Toast.show({
        type: 'error',
        text1: title,
        text2: message,
        visibilityTime: showTime,
    });
}

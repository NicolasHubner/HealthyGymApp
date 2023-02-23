import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BackButtonProps {
    children: React.ReactNode;
    width?: number;
}

export function BackButton({ children, width = 32 }: BackButtonProps) {
    const { canGoBack, goBack } = useNavigation<INavigation>();

    return (
        <View style={{ width }}>
            <TouchableOpacity onPress={canGoBack() ? () => goBack() : () => null}>
                {children}
            </TouchableOpacity>
        </View>
    );
}

import { View } from 'react-native';

interface PageContainerProps {
    children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                height: 'auto',
                width: '100%',
                marginTop: 'auto',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                padding: 24,
            }}>
            {children}
        </View>
    );
}

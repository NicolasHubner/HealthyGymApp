import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SelectUser } from '@/screens/Logged/FineShape/screens/SelectUser';
import { EvolutionPhotoHistoryScreen } from '@/screens/Logged/EvolutionPhoto/screens/history';
import { PhotoComparation } from '@/screens';

interface EvolutionPhotosStackScreenProps extends StackScreenProps {}

export function EvolutionPhotosStackScreen({ stack: Stack }: EvolutionPhotosStackScreenProps) {
    if (!Stack) return <></>;

    return (
        <Stack.Group
            screenOptions={
                {
                    headerShown: false,
                } as NativeStackNavigationOptions
            }>
            <Stack.Screen
                name={RouteNames.logged.evolutionPhotos.history}
                component={EvolutionPhotoHistoryScreen}
            />
            <Stack.Screen
                name={RouteNames.logged.evolutionPhotos.newRegister}
                component={SelectUser}
            />

            <Stack.Screen
                name={RouteNames.logged.evolutionPhotos.compare}
                component={PhotoComparation}
            />
        </Stack.Group>
    );
}

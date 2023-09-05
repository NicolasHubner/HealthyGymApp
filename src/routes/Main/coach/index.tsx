import { StackScreenProps } from '@/helpers/interfaces/Stack';
import { CoachScreens } from './screens';

interface CoachStackScreens extends StackScreenProps {}

export function CoachStackScreens({ stack: Stack }: CoachStackScreens) {
    if (!Stack) return <></>;

    return (
        <>
            {CoachScreens.map(screen => (
                <Stack.Screen
                    key={screen.id}
                    name={screen.name}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </>
    );
}

import { FineShapeQuestion } from '@/screens/Logged/FineShape/Question';

import { StackScreenProps } from '@/helpers/interfaces/Stack';

interface FineShapeStackScreensProps extends StackScreenProps {}

export function FineShapeStackScreen({ stack: Stack }: FineShapeStackScreensProps) {
    if (!Stack) return <></>;

    return (
        <>
            <Stack.Screen name="FineShape-Question" component={FineShapeQuestion} />
        </>
    );
}

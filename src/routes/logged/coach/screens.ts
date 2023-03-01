import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { StackScreen } from '@/helpers/interfaces/Stack';
import { RouteNames } from '@/routes/routes_names';
import { screenOptionsTransparent } from '@/routes/stackConfigs';
import { Students } from '@/screens/Logged/Coach/Students';

export const CoachScreens: StackScreen[] = [
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.students,
        component: Students,
        options: {
            ...screenOptionsTransparent,
        },
    },
];

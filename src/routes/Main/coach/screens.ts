import { Students } from '@/screens/Main/Coach/Students';
import { StudentsDetails } from '@/screens/Main/Coach/StudentsDetails';

import { RouteNames } from '@/routes/routes_names';
import { screenOptionsTransparent } from '@/routes/stackConfigs';

import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { StackScreen } from '@/helpers/interfaces/Stack';

export const CoachScreens: StackScreen[] = [
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.students,
        component: Students,
        options: {
            ...screenOptionsTransparent,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.studentDetails,
        component: StudentsDetails,
        options: {
            ...screenOptionsTransparent,
        },
    },
];

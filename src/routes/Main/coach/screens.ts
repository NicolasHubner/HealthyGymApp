import { Students } from '@/screens/Main/Coach/Students';
import { StudentsDetails } from '@/screens/Main/Coach/StudentsDetails';

import { RouteNames } from '@/routes/routes_names';
import { screenOptionsTransparent } from '@/routes/stackConfigs';

import { generateRandomUuid } from '@/helpers/functions/generateUuid';
import { StackScreen } from '@/helpers/interfaces/Stack';
import { StarRace, Suplements, SuplementsLog, SuplementsToStudents } from '@/screens';

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
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.suplements,
        component: Suplements,
        options: {
            ...screenOptionsTransparent,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.suplementToStudents,
        component: SuplementsToStudents,
        options: {
            ...screenOptionsTransparent,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.suplementsLog,
        component: SuplementsLog,
        options: {
            ...screenOptionsTransparent,
        },
    },
    {
        id: generateRandomUuid(),
        name: RouteNames.logged.coach.starsRace,
        component: StarRace,
        options: {
            ...screenOptionsTransparent,
        },
    },
];

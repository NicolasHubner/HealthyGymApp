// import { FineShapeScreens } from '@/screens';

// const fineShapeQuestions = FineShapeScreens.reduce(
//     (acc, curr) => ({ ...acc, [curr.id]: `FineShape-${curr.id}` }),
//     {}
// );

export const RouteNames = {
    auth: {
        stackId: 'AuthStack',
        login: 'Login',
        forgotPassword: 'ForgotPassword',
        register: {
            initial: 'Register',
            goals: 'RegisterGoals',
            nutri: 'RegisterNutri',
            sizes: 'RegisterSizes',
            splash: 'RegisterSplash',
            finishRegister: 'FinishRegister',
        },
    },
    logged: {
        home: 'Home',
        notification: 'Notification',
        food: {
            daily: 'Daily',
            details: {
                initial: 'FoodDetailsInitial',
                ingredients: 'FoodDetailsIngredients',
            },
            shoppingList: 'ShoppingList',
            creatingFood: 'CreatingFood',
            searchFood: 'SearchFood',
        },
        timeNotification: 'TimeNotification',
        measures: 'Measures',
        addWeigth: 'addWeigth',
        photos: 'Photos',
        photopicker: 'PhotoPicker',
        finishEvolution: 'FinishEvolution',
        sharePhotos: 'SharePhotos',
        userPhotos: 'UserPhotos',
        evolutionPhotos: {
            history: 'EvolutionPhotosHistory',
            details: 'EvolutionPhotosDetails',
            newRegister: 'EvolutionPhotosNewRegister',
            compare: 'EvolutionPhotosCompare',
        },
        listUserAvaliations: 'ListUserAvaliations',
        explorer: 'Explorer',
        water: 'Water',
        metrics: {
            initial: 'Metrics',
            train: 'MetricsTrain',
        },
        calories: 'Calories',
        trainDays: 'TrainDays',
        sleep: 'Sleep',
        suplementsStudent: 'Suplements',
        coach: {
            students: 'CoachStudents',
            studentDetails: 'CoachStudentDetails',
            suplements: 'CoachSuplements',
            suplementToStudents: 'CoachSuplementToStudents',
            suplementsLog: 'CoachSuplementsLog',
            starsRace: 'StarsRace',
        },
        fineshape: {
            initial: 'FineShape-Base-Screen',
            result: 'FineShape-Result',
            question: 'FineShape-Question',
            history: 'FineShape-History',
        },
    },
};

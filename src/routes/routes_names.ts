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
        measures: 'Measures',
        addWeigth: 'addWeigth',
        photos: 'Photos',
        photopicker: 'PhotoPicker',
        finishEvolution: 'FinishEvolution',
        sharePhotos: 'SharePhotos',
        evolutionPhotos: {
            history: 'EvolutionPhotosHistory',
            details: 'EvolutionPhotosDetails',
            newRegister: 'EvolutionPhotosNewRegister',
            compare: 'EvolutionPhotosCompare',
        },
        explorer: 'Explorer',
        water: 'Water',
        metrics: {
            initial: 'Metrics',
            train: 'MetricsTrain',
        },
        calories: 'Calories',
        trainDays: 'TrainDays',
        sleep: 'Sleep',
        coach: {
            students: 'CoachStudents',
            studentDetails: 'CoachStudentDetails',
        },
        fineshape: {
            initial: 'FineShape-Base-Screen',
            result: 'FineShape-Result',
            question: 'FineShape-Question',
            history: 'FineShape-History',
        },
    },
};

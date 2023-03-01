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
        },
        measures: 'Measures',
        photos: 'Photos',
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
        },
    },
};

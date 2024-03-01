import notifee, { EventDetail, EventType } from '@notifee/react-native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

interface INotification {
    navigate: INavigation;
}

export const HandlersNotifee = async ({ navigate }: INotification) => {
    const handleNotificationPress = (detail: EventDetail) => {
        if (detail.pressAction?.id) {
            const { id } = detail.pressAction;
            switch (id) {
                case 'water-reminder':
                    navigate.navigate(RouteNames.logged.water);
                    break;
                case 'train-reminder':
                    navigate.navigate(RouteNames.logged.metrics.train);
                    break;
                case 'lanche4':
                case 'lanche6':
                    navigate.navigate(RouteNames.logged.food.daily);
                    break;
                // Para treinadores

                // case 'avaliation':
                //     navigate.navigate(RouteNames.logged.fineshape.history);
                //     break;
                default:
                    break;
            }
        }
        if (detail.notification?.ios?.categoryId) {
            const { categoryId } = detail?.notification.ios;
            switch (categoryId) {
                case 'water-reminder':
                    navigate.navigate(RouteNames.logged.water);
                    break;
                case 'train-reminder':
                    navigate.navigate(RouteNames.logged.metrics.train);
                    break;
                case 'lanche4':
                case 'lanche6':
                    navigate.navigate(RouteNames.logged.food.daily);
                    break;
                // Para treinadores

                // case 'avaliation':
                //     navigate.navigate(RouteNames.logged.fineshape.history);
                //     break;
                default:
                    break;
            }
        }
    };

    notifee.onBackgroundEvent(async ({ type, detail }) => {
        // Alert.alert('type', JSON.stringify(type, null, 2));

        if (type === EventType.PRESS) {
            // Alert.alert('entrou background');
            handleNotificationPress(detail);
        }
    });

    notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS) {
            // Alert.alert('entrou foreground');
            // Alert.alert('Details ', JSON.stringify(detail, null, 2));
            handleNotificationPress(detail);
        }
    });
};

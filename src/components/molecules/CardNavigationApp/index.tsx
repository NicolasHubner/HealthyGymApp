import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { CardContainer, Cards, CardTitle, ImageLogo, NotifcationBadge } from './style';
import * as Icons from '@expo/vector-icons';

interface Route {
    params: {
        email: string;
    };
}
interface CardNavigationAppProps {
    size?: number;
    title?: string;
    iconName?: string;
    typeIcon?: string;
    route?: string | Route;
    bgColor?: string;
    source?: any;
    isWidth33?: boolean;
    notification?: number;
}

export const CardNavigationApp = ({
    size = 80,
    title,
    iconName,
    typeIcon,
    route,
    bgColor,
    isWidth33 = false,
    source,
    notification = 0,
}: CardNavigationAppProps) => {
    const Icon = Icons[typeIcon as keyof typeof Icons];
    const navigation = useNavigation() as INavigation;

    return (
        <CardContainer
            width={isWidth33}
            onPress={() => (route ? navigation.navigate(route as any) : '')}>
            <Cards size={size} bgColor={bgColor}>
                {iconName && <Icon name={iconName} size={24} color="white" />}
                {!iconName && <ImageLogo size={size} source={source} />}
                {notification > 0 && <NotifcationBadge>{notification}</NotifcationBadge>}
            </Cards>
            {title && <CardTitle>{title}</CardTitle>}
        </CardContainer>
    );
};

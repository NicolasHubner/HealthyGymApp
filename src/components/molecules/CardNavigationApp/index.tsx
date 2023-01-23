import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { CardContainer, Cards, CardTitle } from './style';
import * as Icons from '@expo/vector-icons';

interface CardNavigationAppProps {
  size?: number;
  title: string;
  iconName: string;
  typeIcon: string;
  route: string;
}

export const CardNavigationApp = ({
  size = 80,
  title,
  iconName,
  typeIcon,
  route,
}: CardNavigationAppProps) => {
  const Icon = Icons[typeIcon as keyof typeof Icons];
  const navigation = useNavigation() as INavigation;
  return (
    <CardContainer onPress={() => navigation.navigate(route)}>
      <Cards size={size}>
        <Icon name={iconName} size={24} color="white" />
      </Cards>
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
};

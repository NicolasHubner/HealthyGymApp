import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { CardContainer, Cards, CardTitle, ImageLogo } from './style';
import * as Icons from '@expo/vector-icons';

interface CardNavigationAppProps {
  size?: number;
  title?: string;
  iconName?: string;
  typeIcon?: string;
  route?: string;
  bgColor?: string;
  source?: any;
  mgTop?: number;
  width33?: boolean;
}

export const CardNavigationApp = ({
  size = 80,
  title,
  iconName,
  typeIcon,
  route,
  bgColor,
  source,
  mgTop = 16,
  width33 = true,
}: CardNavigationAppProps) => {
  const Icon = Icons[typeIcon as keyof typeof Icons];
  const navigation = useNavigation() as INavigation;
  return (
    <CardContainer
      width33={width33}
      size={mgTop}
      onPress={() => (route ? navigation.navigate(route) : '')}>
      <Cards size={size} bgColor={bgColor}>
        {iconName && <Icon name={iconName} size={24} color="white" />}
        {!iconName && <ImageLogo size={size} source={source} />}
      </Cards>
      {title && <CardTitle>{title}</CardTitle>}
    </CardContainer>
  );
};

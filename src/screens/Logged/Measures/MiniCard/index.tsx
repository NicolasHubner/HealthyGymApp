import { CardView } from '../style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CardIconText, CardIconView, CardLabel } from './style';

interface IMiniCard {
  label: string;
  icon: string;
  quantity: string;
}

export const MiniCard = ({ label, icon, quantity }: IMiniCard) => {
  const color = '#90D692';
  return (
    <CardView justifycontent="center" alignitems="center" width={157} height={128} margintop={22}>
      <CardIconView>
        {icon === 'height' && (
          <MaterialCommunityIcons name="human-male-height" size={24} color={color} />
        )}
        {icon === 'restaurant' && <MaterialIcons name="restaurant" size={24} color={color} />}
        <CardIconText>{quantity}</CardIconText>
      </CardIconView>
      <CardLabel>{label}</CardLabel>
    </CardView>
  );
};

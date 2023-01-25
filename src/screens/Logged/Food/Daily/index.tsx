import { DailyCalendar } from '@/components/organisms/DailyCalendar';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Box,
  BoxButtonPlus,
  BoxCard,
  BoxCardFooter,
  BoxCardFooterLink,
  BoxCardFooterText,
  BoxCardInfo,
  BoxCardKcal,
  BoxCardTitle,
  BoxContent,
  BoxHeader,
  BoxKcal,
  BoxKcalText,
  BoxTitle,
  BoxTitleContent,
  Container,
  Content,
  FlameIcon,
  Input,
  PlusIcon,
} from './styles';

export function Daily() {
  return (
    <Container>
      <DailyCalendar />
      <Content>
        <Input />

        <Box>
          <BoxContent>
            <BoxHeader>
              <BoxTitle>Café da manhã</BoxTitle>
              <BoxTitleContent>
                <FlameIcon />
                <BoxKcal>120</BoxKcal>
                <BoxKcalText>kcal / 450 kcal</BoxKcalText>
              </BoxTitleContent>
            </BoxHeader>

            <TouchableOpacity>
              <BoxButtonPlus>
                <PlusIcon />
              </BoxButtonPlus>
            </TouchableOpacity>
          </BoxContent>

          <BoxContent>
            <BoxCard>
              <Image source={{ uri: 'https://fakeimg.pl/300x300/' }} />
              <BoxCardInfo>
                <BoxCardTitle>Salada com trigo e ovo branch</BoxCardTitle>
                <BoxCardKcal>200 kcal</BoxCardKcal>
              </BoxCardInfo>
            </BoxCard>
          </BoxContent>
          <BoxCardFooter>
            <BoxCardFooterText>Lorem ipsum</BoxCardFooterText>
            <BoxCardFooterLink>Lorem ipsum</BoxCardFooterLink>
          </BoxCardFooter>
        </Box>
      </Content>
    </Container>
  );
}

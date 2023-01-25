import { useCallback } from 'react';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { DailyCalendar } from '@/components/organisms/DailyCalendar';

import {
  Box,
  BoxButtonPlus,
  BoxCard,
  BoxCardEmoji,
  BoxCardEmojiContainer,
  BoxCardEmojiText,
  BoxCardFooter,
  BoxCardFooterLink,
  BoxCardFooterText,
  BoxCardImage,
  BoxCardImageContainer,
  BoxCardInfo,
  BoxCardKcal,
  BoxCardTitle,
  BoxContent,
  BoxHeader,
  BoxHeaderWrapper,
  BoxKcal,
  BoxKcalText,
  BoxTitle,
  BoxTitleContent,
  Container,
  Content,
  Divider,
  FlameIcon,
  Input,
  PlusIcon,
} from './styles';

const DATA = [0, 1, 2];

export function Daily() {
  const imageEmoji = 'happy';

  const renderDivider = useCallback(() => <Divider />, []);

  const renderItem = useCallback(
    () => (
      <BoxCard>
        <BoxCardImageContainer>
          <BoxCardImage source={{ uri: 'https://fakeimg.pl/300x300/' }} />

          <BoxCardEmojiContainer>
            <BoxCardEmoji name={imageEmoji} />
          </BoxCardEmojiContainer>
          {imageEmoji !== 'happy' && <BoxCardEmojiText>Carboidrato alto!</BoxCardEmojiText>}
        </BoxCardImageContainer>

        <BoxCardInfo>
          <BoxCardTitle>Salada com trigo e ovo branch</BoxCardTitle>
          <BoxCardKcal>200 kcal</BoxCardKcal>
        </BoxCardInfo>
      </BoxCard>
    ),
    []
  );

  return (
    <Container>
      <DailyCalendar />
      <Content>
        <Input />

        <Box>
          <BoxHeaderWrapper>
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
          </BoxHeaderWrapper>

          <Divider />

          <BoxContent>
            <FlatList
              data={DATA}
              keyExtractor={item => String(item)}
              ItemSeparatorComponent={renderDivider}
              renderItem={renderItem}
            />
          </BoxContent>

          <Divider />

          <BoxCardFooter>
            <BoxCardFooterText>
              Sua sopa de abóbora é rica em carboidratos. Tente substituir…
            </BoxCardFooterText>
            <BoxCardFooterLink>Veja mais</BoxCardFooterLink>
          </BoxCardFooter>
        </Box>
      </Content>
    </Container>
  );
}

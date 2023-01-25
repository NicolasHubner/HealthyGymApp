import { FoodCard } from '@/components/molecules/FoodCard';
import { Fragment, useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  Box,
  BoxButtonPlus,
  BoxCardFooter,
  BoxCardFooterLink,
  BoxCardFooterText,
  BoxContent,
  BoxHeader,
  BoxHeaderWrapper,
  BoxKcal,
  BoxKcalText,
  BoxTitle,
  BoxTitleContent,
  Divider,
  FlameIcon,
  PlusIcon,
} from './styles';

const DATA = [0, 1, 2];

interface FoodBoxContent {
  title: string;
}

export function FoodBoxContent({ title }: FoodBoxContent) {
  const renderDivider = useCallback(() => <Divider />, []);

  return (
    <Box>
      <BoxHeaderWrapper>
        <BoxHeader>
          <BoxTitle>{title ?? 'Café da manhã'}</BoxTitle>
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
        {DATA.map((item, index) => (
          <Fragment key={item}>
            <FoodCard key={item} />
            {index !== DATA.length - 1 && renderDivider()}
          </Fragment>
        ))}
      </BoxContent>

      <Divider />

      <BoxCardFooter>
        <BoxCardFooterText>
          Sua sopa de abóbora é rica em carboidratos. Tente substituir…
        </BoxCardFooterText>
        <BoxCardFooterLink>Veja mais</BoxCardFooterLink>
      </BoxCardFooter>
    </Box>
  );
}

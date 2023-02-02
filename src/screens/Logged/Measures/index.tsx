import CardWarnings from '@/components/molecules/CardWarnings';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';

export default function Measures() {
  return (
    <ScrollablePageWrapper>
      <CardWarnings
        textSubTitle="Dica"
        textSubtitleBody="Tente se pesar uma vez por semana sempre nos mesmos horários. Isso facilita o planejamento do Coach"
        textSeeMore="Ver mais"
      />
    </ScrollablePageWrapper>
  );
}

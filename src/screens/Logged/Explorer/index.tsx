import TitlePattern from '@/components/atoms/TitlePattern';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { ContainerTitle } from './style';

export default function Explorer() {
  return (
    <ScrollablePageWrapper>
      <ContainerTitle>
        <TitlePattern size={32}>Explorer</TitlePattern>
      </ContainerTitle>
    </ScrollablePageWrapper>
  );
}

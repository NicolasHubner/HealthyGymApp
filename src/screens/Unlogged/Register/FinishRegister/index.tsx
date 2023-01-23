import { Button } from '@/components/atoms/Button';
import { ImageCorrectLogo } from '@/components/atoms/Images';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { ButtonContainer } from './style';

export const FinishRegister = () => {
  const navigator = useNavigation() as INavigation;

  const handlePress = () => {
    navigator.navigate(RouteNames.logged.home);
  };

  return (
    <PageWrapper marginTop={150}>
      <TextSubTitleGreen>Cadastro Finalizado com Sucesso!</TextSubTitleGreen>
      <ImageCorrectLogo />
      <ButtonContainer>
        <Button label="Próximo" onPress={handlePress} />
      </ButtonContainer>
    </PageWrapper>
  );
};

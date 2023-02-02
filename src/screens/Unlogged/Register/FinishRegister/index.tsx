import { Button } from '@/components/atoms/Button';
import { ImageCorrectLogo } from '@/components/atoms/Images';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { RootState } from '@/store';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ButtonContainer } from './style';
import { api } from '@/services/api';

export interface IUserPost {
  username: string;
  email: string;
  password: string;
  name: string;
  birthdate: string;
  gender: string;
  weight: number;
  height: number;
  goal_type: string;
  phone: string;
}

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  genre: string;
  password: string;
  birthday: Date;
  weight: number;
  height: number;
  goal: string;
}

export const FinishRegister = () => {
  const navigator = useNavigation() as INavigation;
  const user = useSelector((state: RootState) => state.user) as User;
  // console.log(user);
  const handlePress = async () => {
    const birthday = new Date(user.birthday);
    const newBirthday = `${birthday.getDate()}-${
      birthday.getMonth() + 1
    }-${birthday.getFullYear()}`;

    try {
      const newData: IUserPost = {
        username: user.email,
        email: user.email,
        password: user.password,
        name: user.name,
        birthdate: newBirthday,
        gender: user.genre,
        weight: user.weight,
        height: user.height,
        goal_type: user.goal,
        phone: user.phone,
      };
      const data = await api.post('/auth/local/register', newData);
      console.log('data', data);
      // navigator.navigate(RouteNames.logged.home);
    } catch (error) {
      console.log('response', JSON.stringify(error.response.data.error));
    }
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

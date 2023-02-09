import { Button } from '@/components/atoms/Button';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { ButtonContainer } from '@/screens/Unlogged/Login/style';
import React, { useState } from 'react';
import {
  ContainerTop,
  ImageTumble,
  Subtitle,
  TextTumble,
  Title,
  Tumble,
  ViewTumble,
} from './style';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';

interface PickImageProps {
  setPickedImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Photos() {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [pickedImagePath2, setPickedImagePath2] = useState('');
  const [pickedImagePath3, setPickedImagePath3] = useState('');

  const navigator = useNavigation() as INavigation;

  const pickImage = async ({ setPickedImage }: PickImageProps) => {
    // No permissions request is necessary for launching the image library
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };
  interface handleTumbleProps {
    setPicked: React.Dispatch<React.SetStateAction<string>>;
    image?: string;
  }
  const handleTumble = ({ setPicked, image }: handleTumbleProps) => {
    if (!image) {
      pickImage({ setPickedImage: setPicked });
    }
  };
  const handleButtonContinue = () => {
    Alert.alert('Finalizado', 'Já pode começar a utilizar o app!');
    navigator.navigate(RouteNames.logged.home);
  };
  return (
    <ScrollablePageWrapper padding={0}>
      <ContainerTop>
        <Title>Vamos fazer suas fotos?</Title>
        <Subtitle>Primeiro faça uma foto do seu perfil direito.</Subtitle>
      </ContainerTop>
      <ViewTumble>
        <Tumble onPress={() => handleTumble({ setPicked: setPickedImagePath })}>
          <TextTumble>Perfil Direito</TextTumble>
          {pickedImagePath && <ImageTumble source={{ uri: pickedImagePath }} />}
        </Tumble>
        <Tumble onPress={() => handleTumble({ setPicked: setPickedImagePath2 })}>
          <TextTumble>Foto de Frente</TextTumble>
          {pickedImagePath2 && <ImageTumble source={{ uri: pickedImagePath2 }} />}
        </Tumble>
        <Tumble onPress={() => handleTumble({ setPicked: setPickedImagePath3 })}>
          <TextTumble>Foto de Costas</TextTumble>
          {pickedImagePath3 && <ImageTumble source={{ uri: pickedImagePath3 }} />}
        </Tumble>
      </ViewTumble>
      <ButtonContainer>
        <Button
          isDisabled={!(pickedImagePath && pickedImagePath2 && pickedImagePath3)}
          onPress={handleButtonContinue}
          label="Continuar"
        />
      </ButtonContainer>
    </ScrollablePageWrapper>
  );
}

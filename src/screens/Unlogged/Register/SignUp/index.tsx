import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import React, { useEffect, useState } from 'react';
// import { Text } from "react-native";

import {
  ButtonContainer,
  CheckBoxContainer,
  CheckBoxText,
  InputContainer,
  Inputs,
  LoginContainer,
  LoginText,
  Subtitle,
  SubtitleContainer,
  SubtitleContainerCreate,
  SubtitleCreate,
} from './styles';

import { Logo } from '@/components/atoms/Logo';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Button } from '@/components/atoms/Button';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useForm, Controller } from 'react-hook-form';
import { TextRequired } from '@/components/atoms/TextRequired';

export function SignUp() {
  const navigation = useNavigation() as INavigation;
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const [statusPassword, setStatusPassword] = useState<boolean>(true);
  const [statusCheckBox, setStatusCheckBox] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  useEffect(() => {
    const email = watch('email');
    const password = watch('password');
    const name = watch('name');
    const phone = watch('phone');
    if (email && password && name && phone) {
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('email'), watch('password')]);

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate(RouteNames.auth.register.sizes);
  };

  if (!fontsLoaded) {
    return null;
  }

  // Não pude criar alguns inputs padronizados como moléculas, pois iria alterar devido a importação de qual icone iria utilizar, tendo que fazer tudo INLINE //
  return (
    <ScrollablePageWrapper>
      <Logo />
      <SubtitleContainer>
        <Subtitle>Hei, que bom ter você por aqui</Subtitle>
      </SubtitleContainer>

      <SubtitleContainerCreate>
        <SubtitleCreate>Crie sua conta</SubtitleCreate>
      </SubtitleContainerCreate>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputContainer>
            <Ionicons
              name="person"
              size={17}
              color="#7B6F72"
              style={{ position: 'absolute', left: 30, zIndex: 1 }}
            />
            <Inputs onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Nome" />
          </InputContainer>
        )}
      />
      {errors.name && <TextRequired>This is required.</TextRequired>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputContainer>
            <AntDesign
              name="phone"
              size={17}
              color="#7B6F72"
              style={{ position: 'absolute', left: 30, zIndex: 1 }}
            />
            <Inputs onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Telefone" />
          </InputContainer>
        )}
      />
      {errors.phone && <TextRequired>This is required.</TextRequired>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputContainer>
            <MaterialCommunityIcons
              name="email-outline"
              size={17}
              color="#7B6F72"
              style={{ position: 'absolute', left: 30, zIndex: 1 }}
            />
            <Inputs onChangeText={onChange} onBlur={onBlur} value={value} placeholder="E-mail" />
          </InputContainer>
        )}
      />
      {errors.email && <TextRequired>This is required.</TextRequired>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputContainer>
            <AntDesign
              name="lock"
              size={17}
              color="#7B6F72"
              style={{ position: 'absolute', left: 30, zIndex: 1 }}
            />
            <Inputs
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={statusPassword}
              placeholder="Senha"
            />
            <Entypo
              onPress={() => setStatusPassword(!statusPassword)}
              name={statusPassword ? 'eye' : 'eye-with-line'}
              size={17}
              color="#7B6F72"
              style={{ position: 'absolute', right: 40, zIndex: 1 }}
            />
          </InputContainer>
        )}
      />
      {errors.password && <TextRequired>This is required.</TextRequired>}

      <CheckBoxContainer>
        {!statusCheckBox && (
          <MaterialCommunityIcons
            onPress={() => setStatusCheckBox(!statusCheckBox)}
            name="checkbox-blank-outline"
            size={24}
            color="#AEAEB5"
          />
        )}
        {statusCheckBox && (
          <MaterialCommunityIcons
            onPress={() => setStatusCheckBox(!statusCheckBox)}
            name="checkbox-marked"
            size={24}
            color="#90D692"
          />
        )}
        <CheckBoxText>
          Ao continuar você aceita nossa Política de Privacidade e Termos de Uso
        </CheckBoxText>
      </CheckBoxContainer>

      <ButtonContainer>
        <Button isDisabled={isDisabled} label="Cadastrar" onPress={handleSubmit(onSubmit)} />
      </ButtonContainer>
      {/* // Colocar para trocar a cor quando o botão estiver desabilitado, em cor mais clara[NICOLAS] // */}

      <LoginContainer>
        <LoginText>Ja tem uma conta?</LoginText>
        <TextAsLink onPress={() => navigation.navigate(RouteNames.auth.login)} label="Login" />
      </LoginContainer>
    </ScrollablePageWrapper>
  );
}

import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NewControlledInput } from '@/components/molecules/NewControlledInput';
import { setUserInfo } from '@/store/user';

export function SignUp() {
  const [statusPassword, setStatusPassword] = useState<boolean>(true);
  const [statusCheckBox, setStatusCheckBox] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigation = useNavigation() as INavigation;

  const passwordSchema = yup
    .string()
    .required('O campo de senha não pode estar vazio')
    .min(6, 'São necessários pelo menos 6 caracteres');

  const emailSchema = yup
    .string()
    .required('O campo de e-mail é obrigatório')
    .email('Insira um e-mail válido');

  const formShape = yup.object().shape({
    name: yup.string().required('O campo "Nome" é obrigatório'),
    phone: yup.string().required('O campo "Telefone" é obrigatório'),
    password: passwordSchema,
    email: emailSchema,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(formShape),
  });
  // const user = useSelector((state: any) => state.user);

  const email = watch('email');
  const password = watch('password');
  const name = watch('name');
  const phone = watch('phone');

  const disableSubmitButtonWhenInputsWereEmpty = useCallback(() => {
    if (email && password && name && phone && statusCheckBox) {
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
      return;
    }
  }, [email, password, name, phone, statusCheckBox]);

  useEffect(() => {
    disableSubmitButtonWhenInputsWereEmpty();

    return () => {
      disableSubmitButtonWhenInputsWereEmpty();
    };
  }, [email, password, name, phone, disableSubmitButtonWhenInputsWereEmpty]);

  const onSubmit = (data: any) => {
    const userObject = {
      ...data,
      username: data.email,
    };

    try {
      dispatch(setUserInfo(userObject));
      navigation.navigate(RouteNames.auth.register.sizes);
    } catch (err) {
      console.error('Ocorreu um erro ao salvar as informações do usuário.', err);
    }
  };

  return (
    <ScrollablePageWrapper>
      <Logo />
      <SubtitleContainer>
        <Subtitle>Hei, que bom ter você por aqui</Subtitle>
      </SubtitleContainer>

      <SubtitleContainerCreate>
        <SubtitleCreate>Crie sua conta</SubtitleCreate>
      </SubtitleContainerCreate>

      <NewControlledInput
        errors={errors}
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

      <NewControlledInput
        errors={errors}
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

      <NewControlledInput
        errors={errors}
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
            <Inputs
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </InputContainer>
        )}
      />

      <NewControlledInput
        errors={errors}
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

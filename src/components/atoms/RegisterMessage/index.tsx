import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { TextAsLink } from '@/components/atoms/TextAsLink';
import { INavigation } from '@/helpers/interfaces/INavigation';

import { RouteNames } from '@/routes/routes_names';

import { RegisterContainer, RegisterText } from './styles';

export function RegisterMessage() {
  const navigation = useNavigation<INavigation>();

  return (
    <RegisterContainer>
      <RegisterText>Não tem uma conta ainda?</RegisterText>
      <TextAsLink
        onPress={() => navigation.navigate(RouteNames.auth.register.initial)}
        label="Registro"
      />
    </RegisterContainer>
  );
}

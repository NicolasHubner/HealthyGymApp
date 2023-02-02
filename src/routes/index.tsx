import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { Logged } from '@/routes/logged';
import { Unlogged } from '@/routes/unlogged';

export function Routes() {
  const isUserLogged = true;

  return (
    <NavigationContainer>
      {!isUserLogged && <Unlogged />}
      {!!isUserLogged && <Logged />}
    </NavigationContainer>
  );
}

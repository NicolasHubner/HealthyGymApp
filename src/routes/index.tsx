import { NavigationContainer } from '@react-navigation/native';
import React, { useMemo } from 'react';

import { Logged } from '@/routes/logged';
import { Unlogged } from '@/routes/unlogged';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Routes() {
  const { id, token, isLogged } = useSelector((state: RootState) => state.user);

  const isUserLogged = useMemo(() => !!id && !!token && !!isLogged, [id, token, isLogged]);
  // const isUserLogged = true;

  return <NavigationContainer>{!isUserLogged ? <Unlogged /> : <Logged />}</NavigationContainer>;
}

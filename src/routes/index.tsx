import { NavigationContainer } from '@react-navigation/native';
import React, { useMemo } from 'react';

import { Logged } from '@/routes/logged';
import { Unlogged } from '@/routes/unlogged';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Routes() {
  const { id, token } = useSelector((state: RootState) => state.user);

  const isUserLogged = useMemo(() => !!id && !!token, [id, token]);

  return <NavigationContainer>{!isUserLogged ? <Unlogged /> : <Logged />}</NavigationContainer>;
}

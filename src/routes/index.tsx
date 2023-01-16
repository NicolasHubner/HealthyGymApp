// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import Logged from './logged';
import Unlogged from './unlogged';


function RoutesStack() {

  const [status, setStatus] = useState<'logged' | 'unlogged'>('unlogged');
  return (
    <NavigationContainer
    >
      {status === 'logged' && <Logged />}
      {status === 'unlogged' && <Unlogged />}
    </NavigationContainer>
  );
}

export default RoutesStack;
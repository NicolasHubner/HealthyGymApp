import React from 'react';
import { LogoImage, LogoPattern, LogoImageWoman } from './styles';

import logoImg from '@/assets/logo.png';
import logoSquat from '@/assets/logo_squat.png';
import BgWoman from '@/assets/Bg.png';

export function Logo() {
  return <LogoImage source={logoImg} />;
}

export function LogoSquat() {
  return <LogoPattern source={logoSquat} />;
}

export function LogoWoman() {
  return <LogoImageWoman source={BgWoman} />;
}

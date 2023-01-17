import React from 'react';
import { LogoImage, LogoImageSquat } from './styles';

import logoImg from '@/assets/logo.png';
import logoSquat from '@/assets/logo_squat.png';

export function Logo() {
    return <LogoImage source={logoImg} />;
}

export function LogoSquat() {
    return <LogoImageSquat source={logoSquat} />;
}

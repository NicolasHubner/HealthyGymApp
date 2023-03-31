import React from 'react';
import { LogoImage, LogoPattern, LogoImageWoman, LogoForgotPasswordImage } from './styles';

import logoImg from '@/assets/icone.png';
import logoSquat from '@/assets/logo_squat.png';
import BgWoman from '@/assets/Bg.png';
import ImageForgotPassword from '@/assets/forgotPasswordImage.png';

export function Logo() {
    return <LogoImage source={logoImg} />;
}

export function LogoSquat() {
    return <LogoPattern source={logoSquat} />;
}

export function LogoWoman() {
    return <LogoImageWoman source={BgWoman} />;
}

export function LogoForgotPassword() {
    return <LogoForgotPasswordImage source={ImageForgotPassword} />;
}

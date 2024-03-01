import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ContainerButton } from './style';
import { useTheme } from 'styled-components/native';

interface FavoriteFoodProps {
    favorited: boolean;
    setFavorited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FavoriteFood({ favorited, setFavorited }: FavoriteFoodProps) {
    const { colors } = useTheme();
    return (
        <ContainerButton onPress={() => setFavorited(!favorited)}>
            <AntDesign name={favorited ? 'hearto' : 'heart'} size={16} color={colors.green[500]} />
        </ContainerButton>
    );
}

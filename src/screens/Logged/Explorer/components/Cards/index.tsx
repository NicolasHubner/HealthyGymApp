import TitlePattern from '@/components/atoms/TitlePattern';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import {
    Card,
    CardDescription,
    CardImage,
    CardTitle,
    ContainerCards,
    FavoriteIcon,
    ProfileImage,
    ProfileName,
} from './style';

export default function Cards() {
    const [favoriteFood, setFavoriteFood] = useState(false);
    const { colors } = useTheme();
    return (
        <ContainerCards
            contentContainerStyle={{
                alignItems: 'center',
                paddingLeft: 24,
                // marginVertical: 24,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Card>
                <CardImage source={require('@/assets/ExplorerCards/Mask.png')} />
                <CardTitle>
                    <TitlePattern size={18}>
                        20 minutos ao ar livre podem diminuir o estresse
                    </TitlePattern>
                </CardTitle>
                <CardDescription>
                    <ProfileImage source={require('@/assets/Avatar.png')} />
                    <ProfileName>Carlos Augusto</ProfileName>
                    <FavoriteIcon
                        onPress={() => {
                            setFavoriteFood(!favoriteFood);
                        }}>
                        <AntDesign
                            name={'heart'}
                            size={20}
                            color={favoriteFood ? colors.green[500] : colors.gray[300]}
                        />
                    </FavoriteIcon>
                </CardDescription>
            </Card>
            <Card>
                <CardImage source={require('@/assets/ExplorerCards/Mask.png')} />
                <CardTitle>
                    <TitlePattern size={18}>
                        20 minutos ao ar livre podem diminuir o estresse
                    </TitlePattern>
                </CardTitle>
                <CardDescription>
                    <ProfileImage source={require('@/assets/Avatar.png')} />
                    <ProfileName>Carlos Augusto</ProfileName>
                    <FavoriteIcon
                        onPress={() => {
                            setFavoriteFood(!favoriteFood);
                        }}>
                        <AntDesign
                            name={'heart'}
                            size={20}
                            color={favoriteFood ? colors.green[500] : colors.gray[300]}
                        />
                    </FavoriteIcon>
                </CardDescription>
            </Card>
            <Card>
                <CardImage source={require('@/assets/ExplorerCards/Mask.png')} />
                <CardTitle>
                    <TitlePattern size={18}>
                        20 minutos ao ar livre podem diminuir o estresse
                    </TitlePattern>
                </CardTitle>
                <CardDescription>
                    <ProfileImage source={require('@/assets/Avatar.png')} />
                    <ProfileName>Carlos Augusto</ProfileName>
                    <FavoriteIcon
                        onPress={() => {
                            setFavoriteFood(!favoriteFood);
                        }}>
                        <AntDesign
                            name={'heart'}
                            size={20}
                            color={favoriteFood ? colors.green[500] : colors.gray[300]}
                        />
                    </FavoriteIcon>
                </CardDescription>
            </Card>
        </ContainerCards>
    );
}

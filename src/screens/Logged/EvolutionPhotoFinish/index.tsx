import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React from 'react';
import BgImage from '@/assets/svg/bgimage.svg';
import { Alert, Dimensions } from 'react-native';
import { ButtonsPhoto, ContainerTop, MedalImage, SubtitleFinish, TextButton, Title } from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';

export default function FinishEvolution() {
    const { width, height } = Dimensions.get('window');
    const navigator = useNavigation() as INavigation;
    const handleButtonContinue = () => {
        Alert.alert('Concluir a evolução com sucesso');
        navigator.navigate('Home');
    };

    return (
        <ScrollablePageWrapper padding={0} edges={['left', 'right']}>
            <ContainerTop>
                <BgImage
                    style={{ position: 'absolute', opacity: 0.7 }}
                    preserveAspectRatio="xMidYMid slice"
                    width={width}
                    height={height}
                />

                <Title>Primeiro passo para o sucesso!</Title>

                <MedalImage
                    source={require('@/assets/PhotoScreen/Medal.png')}
                    // resizeMode="contain"
                />

                <SubtitleFinish>
                    Você ganhou sua primeira medalha por concluir seu perfil.
                </SubtitleFinish>

                <TouchableOpacity onPress={handleButtonContinue}>
                    <ButtonsPhoto>
                        <TextButton>Continuar</TextButton>
                    </ButtonsPhoto>
                </TouchableOpacity>
            </ContainerTop>
        </ScrollablePageWrapper>
    );
}

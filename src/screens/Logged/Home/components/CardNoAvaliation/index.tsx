import { View, Text } from 'native-base';
import { useTheme } from 'styled-components';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { useCallback } from 'react';

export default function CardNoAvaliation() {
    const { colors } = useTheme();

    const handlePressWpp = useCallback(async () => {
        const suported = await Linking.openURL(
            'https://wa.me/5511998063957?text=Ol%C3%A1+gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o+com+voc%C3%AA'
        );
        if (suported) {
            await Linking.openURL(
                'https://wa.me/5511998063957?text=Ol%C3%A1+gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o+com+voc%C3%AA'
            );
        } else {
            console.error('Não foi possível abrir o link');
        }
    }, []);

    return (
        <View
            bgColor={colors.green[300]}
            w={'100%'}
            mt={4}
            paddingY={4}
            paddingX={4}
            flexDir={'row'}
            alignItems={'center'}
            borderRadius={12}>
            <View w={'4/5'}>
                <Text
                    fontSize={'18px'}
                    fontFamily={'Rubik_500Medium'}
                    letterSpacing={'0.2px'}
                    lineHeight={'24px'}
                    color={colors.blue_metal[700]}>
                    Você não possui avaliação
                </Text>

                <Text
                    fontSize={'14px'}
                    fontFamily={'Rubik_400Regular'}
                    letterSpacing={'0.2px'}
                    lineHeight={'24px'}
                    color={colors.blue_metal[500]}
                    mt={2}>
                    Entre em contato com seu coach para realizar uma avaliação ou clique no botão ao
                    lado e será redirecionado
                </Text>
            </View>

            <View w={'1/5'} marginX={4}>
                <TouchableOpacity onPress={() => handlePressWpp()}>
                    <FontAwesome name="whatsapp" size={48} color={colors.green[700]} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

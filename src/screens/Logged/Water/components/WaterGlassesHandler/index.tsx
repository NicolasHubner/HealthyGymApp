import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Picker from '@ouroboros/react-native-picker';
import { useTheme } from 'styled-components';

import { RootState } from '@/store';
import { api } from '@/services/api';

import waterGlassImg from '@/assets/water_glass_image.png';

import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';

import {
    AddWaterGlassButton,
    ButtonContainer,
    ControlWaterGlassesContainer,
    DecreaseIcon,
    IncreaseIcon,
    WaterGlassButtonText,
    WaterGlassesRow,
    WaterGlassesTitle,
    WaterGlassImage,
    WaterIcon,
} from './styles';
import { scale } from 'react-native-size-matters';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

const WATER_GLASS_SIZES = [50, 100, 150, 200, 250, 300];

interface WaterGlassesHandlerProps {
    handleDecreaseWaterGlasses: () => void;
    handleIncreaseWaterGlasses: () => void;
    handleAddWaterGlasses: (waterGlassSize?: number) => void;
    waterGlassesToAdd: number;
}

export function WaterGlassesHandler({
    handleDecreaseWaterGlasses,
    handleIncreaseWaterGlasses,
    handleAddWaterGlasses,
    waterGlassesToAdd,
}: WaterGlassesHandlerProps) {
    const [loading, setLoading] = useState(false);
    const [waterGlassSize, setWaterGlassSize] = useState(200);

    const { id: userId, token } = useSelector((state: RootState) => state.user);
    const { colors, font_family } = useTheme();

    const parseDataToSendToApi = useCallback(() => {
        return {
            data: {
                datetime: new Date(),
                amount: waterGlassesToAdd * waterGlassSize,
                user: userId,
            },
        };
    }, [userId, waterGlassesToAdd, waterGlassSize]);

    const addWaterToHistory = useCallback(async () => {
        setLoading(true);

        try {
            const dataToSend = parseDataToSendToApi();
            const headers = generateAuthHeaders(token!);

            await api.post('/water-histories', dataToSend, { headers });

            handleAddWaterGlasses(waterGlassSize);

            throwSuccessToast({
                title: 'Copo adicionado 😁',
                message: 'A água foi adicionada ao seu histórico!',
                showTime: 2000,
            });
        } catch (err) {
            console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
            throwErrorToast({
                title: 'Ocorreu um erro 😟',
                message:
                    'Não foi possível adicionar a água ao seu histórico. Por favor, tente novamente!',
            });
        } finally {
            setLoading(false);
        }
    }, [handleAddWaterGlasses, waterGlassSize, token, parseDataToSendToApi]);

    const renderWaterSelectorContent = () => {
        return (
            <WaterGlassesTitle
                style={{
                    color: colors.green[700],
                    textDecorationLine: 'underline',
                    textDecorationColor: colors.green[700],
                }}>
                {waterGlassSize}ml
            </WaterGlassesTitle>
        );
    };

    return (
        <ControlWaterGlassesContainer>
            <WaterGlassesRow>
                <ButtonContainer isDisabled={waterGlassesToAdd === 1}>
                    <TouchableOpacity
                        onPress={handleDecreaseWaterGlasses}
                        disabled={waterGlassesToAdd === 1}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <DecreaseIcon />
                    </TouchableOpacity>
                </ButtonContainer>

                <WaterGlassImage source={waterGlassImg} />

                <ButtonContainer isDisabled={waterGlassesToAdd >= 20}>
                    <TouchableOpacity
                        onPress={handleIncreaseWaterGlasses}
                        disabled={waterGlassesToAdd >= 20}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <IncreaseIcon />
                    </TouchableOpacity>
                </ButtonContainer>
            </WaterGlassesRow>

            <View style={{ flexDirection: 'row', gap: 4 }}>
                <WaterGlassesTitle>
                    {waterGlassesToAdd} {waterGlassesToAdd > 1 ? 'copos' : 'copo'}
                </WaterGlassesTitle>
                <Picker
                    onChanged={setWaterGlassSize}
                    options={WATER_GLASS_SIZES.map(item => ({
                        value: item,
                        text: `${item}ml`,
                    }))}
                    style={{
                        fontFamily: font_family.regular,
                        color: colors.blue_metal[500],
                        fontSize: scale(13),
                        letterSpacing: 0.5,
                        width: '100%',
                    }}
                    value={waterGlassSize}
                    component={renderWaterSelectorContent}
                />
            </View>

            <TouchableOpacity onPress={addWaterToHistory} disabled={loading}>
                <AddWaterGlassButton>
                    {!!loading && <ActivityIndicator size="small" color="#fff" />}

                    {!loading && (
                        <>
                            <WaterIcon />
                            <WaterGlassButtonText>
                                Adicionar {waterGlassesToAdd > 1 ? 'copos' : 'copo'}
                            </WaterGlassButtonText>
                        </>
                    )}
                </AddWaterGlassButton>
            </TouchableOpacity>
        </ControlWaterGlassesContainer>
    );
}

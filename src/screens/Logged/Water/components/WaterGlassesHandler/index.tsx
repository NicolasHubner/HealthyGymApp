import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { RootState } from '@/store';
import { api } from '@/services/api';

import waterGlassImg from '@/assets/water_glass_image.png';

import { throwErrorToast, throwSuccessToast } from '@/helpers/functions/handleToast';

import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { setUserMetrics } from '@/store/user';

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
    const [isGlassSizeEditable, setIsGlassSizeEditable] = useState(false);

    const { id: userId, token, metrics } = useSelector((state: RootState) => state.user);
    const { waterGlassSize: waterGlassSizeFromStore } = metrics!;
    const { colors, font_family } = useTheme();

    const dispatch = useDispatch();
    const waterGlassSizePicker = useRef<TextInput>(null);

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
        if (waterGlassSize <= 0) return;

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

    const renderWaterSelectorContent = useCallback(() => {
        if (isGlassSizeEditable) {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 18,
                        width: 50,
                    }}>
                    <TextInput
                        ref={waterGlassSizePicker}
                        placeholder="200ml"
                        maxLength={5}
                        keyboardType="numeric"
                        returnKeyType="done"
                        autoFocus={isGlassSizeEditable}
                        value={String(waterGlassSize)}
                        onBlur={() => {
                            setIsGlassSizeEditable(false);
                            dispatch(setUserMetrics({ waterGlassSize }));
                        }}
                        onSubmitEditing={e => {
                            setIsGlassSizeEditable(false);
                            dispatch(
                                setUserMetrics({ waterGlassSize: Number(e.nativeEvent.text) })
                            );
                        }}
                        onChangeText={e => {
                            setWaterGlassSize(
                                Number(
                                    e
                                        .replace(/,/g, '.')
                                        .replace(/-/g, '')
                                        .replace(' ', '')
                                        .replace(/\.+/g, '.')
                                )
                            );
                        }}
                        style={{
                            color: colors.green[700],
                            fontFamily: font_family.bold,
                            height: 24,
                            fontSize: 16,
                            width: '100%',
                            flexWrap: 'nowrap',
                        }}
                    />
                </View>
            );
        }

        return (
            <TouchableOpacity onPress={() => setIsGlassSizeEditable(curr => !curr)}>
                <WaterGlassesTitle
                    style={{
                        color: colors.green[700],
                        textDecorationLine: 'underline',
                        textDecorationColor: colors.green[700],
                    }}>
                    {waterGlassSize}ml
                </WaterGlassesTitle>
            </TouchableOpacity>
        );
    }, [isGlassSizeEditable, colors.green, waterGlassSize, font_family.bold, dispatch]);

    useEffect(() => {
        if (waterGlassSizeFromStore && waterGlassSizeFromStore !== waterGlassSize) {
            setWaterGlassSize(waterGlassSizeFromStore);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waterGlassSizeFromStore]);

    useEffect(() => {
        if (isGlassSizeEditable) {
            waterGlassSizePicker.current?.focus();
        }
    }, [isGlassSizeEditable]);

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
                {renderWaterSelectorContent()}
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

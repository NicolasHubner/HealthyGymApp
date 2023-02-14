import { TouchableOpacity } from 'react-native-gesture-handler';

import { ActivityIndicator } from 'react-native';

import waterGlassImg from '@/assets/water_glass_image.png';

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
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { api } from '@/services/api';

interface WaterGlassesHandlerProps {
    handleDecreaseWaterGlasses: () => void;
    handleIncreaseWaterGlasses: () => void;
    handleAddWaterGlasses: () => void;
    waterGlassesToAdd: number;
}

export function WaterGlassesHandler({
    handleDecreaseWaterGlasses,
    handleIncreaseWaterGlasses,
    handleAddWaterGlasses,
    waterGlassesToAdd,
}: WaterGlassesHandlerProps) {
    const [loading, setLoading] = useState(false);

    const { id: userId, token } = useSelector((state: RootState) => state.user);

    const addWaterToHistory = useCallback(async () => {
        setLoading(true);

        try {
            const dataToSend = {
                data: {
                    datetime: new Date(),
                    amount: waterGlassesToAdd * 200,
                    user: userId,
                },
            };

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await api.post('/water-histories', dataToSend, { headers });

            handleAddWaterGlasses();
        } catch (err) {
            console.error('Ocorreu um erro ao obter o histório de consumo de água do usuário', err);
        } finally {
            setLoading(false);
        }
    }, [handleAddWaterGlasses, userId, waterGlassesToAdd, token]);

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

            <WaterGlassesTitle>
                {waterGlassesToAdd} {waterGlassesToAdd > 1 ? 'copos' : 'copo'} 200ml
            </WaterGlassesTitle>

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

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import React, { useCallback, useState } from 'react';
import * as S from './style';
import { Weigths } from './Weights';
import { IMC } from './Imc';
import { GraphicsWeights } from './GraphicWeights';
import { Divider, Modal } from 'native-base';
import { throwSuccessToast } from '@/helpers/functions/handleToast';
import { api } from '@/services/api';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Button } from '@/components/atoms/Button';

export default function NewWeight() {
    const [modal, setModal] = useState(false);
    const { token, id, weight } = useSelector((state: RootState) => state.user);
    const [valueWeight, setValueWeight] = useState(weight?.toString() ?? '');
    const [loading, setLoading] = useState(false);

    const parseDataToApi = useCallback(
        (weightParam: string) => {
            const data = {
                data: {
                    datetime: new Date().toISOString(),
                    weight:
                        parseFloat(weightParam) < 0
                            ? parseFloat(weightParam) * -1
                            : parseFloat(weightParam),
                    user: id,
                },
            };

            return data;
        },
        [id]
    );

    const sendWeightToApi = useCallback(
        async (value: string) => {
            try {
                setLoading(true);
                const headers = generateAuthHeaders(token!);
                const dataToApi = parseDataToApi(value);
                await api.post('/weight-histories', dataToApi, { headers });

                throwSuccessToast({
                    title: 'Peso atualizado com sucesso 😊',
                    message: 'Seu peso foi atualizado! ',
                });
                setModal(false);
                setLoading(false);
            } catch (err) {
                console.error('Ocorreu um erro ao salvar as informações de tamanho', err);
            }
        },
        [parseDataToApi, token]
    );

    return (
        <>
            <ScrollablePageWrapper padding={0}>
                <Weigths />

                <S.ContainerPrincipal>
                    <GraphicsWeights load={loading} />

                    <Divider my={4} mt={8} />

                    <IMC />

                    <Button
                        label="Adicionar novo peso"
                        fullWidth
                        onPress={() => {
                            setModal(true);
                        }}
                    />
                </S.ContainerPrincipal>
            </ScrollablePageWrapper>

            <Modal
                isOpen={modal}
                animationPreset="slide"
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
                onClose={() => {
                    setModal(false);
                }}>
                <S.ModalContainer>
                    <S.ModatTitle>Digite o novo peso</S.ModatTitle>
                    <S.ModalInput
                        value={valueWeight.toString()}
                        onChangeText={value => {
                            setValueWeight(value);
                        }}
                        keyboardType="numeric"
                        placeholder="Digite o novo peso"
                        textAlign="center"
                        inputMode="numeric"
                    />
                    <S.ButtonModal
                        onPress={() => {
                            sendWeightToApi(valueWeight);
                        }}>
                        {loading && <ActivityIndicator size="small" color="#fff" />}
                        {!loading && <S.ButtonModalText>Salvar novo peso</S.ButtonModalText>}
                    </S.ButtonModal>
                </S.ModalContainer>
            </Modal>
        </>
    );
}

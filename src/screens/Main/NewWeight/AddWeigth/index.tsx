import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from 'react-native';
import * as S from './style';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { throwSuccessToast } from '@/helpers/functions/handleToast';
import ArrowDown from '@/assets/svg/arrow-down.svg';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { setUserInfo, setUserMetrics } from '@/store/user';

export const AddWeigth = () => {
    const { goBack, navigate } = useNavigation<INavigation>();

    const [fadeAnim, _] = useState(new Animated.Value(0));
    const { token, id, weight } = useSelector((state: RootState) => state.user);

    const [valueWeight, setValueWeight] = useState(weight?.toString() ?? '');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

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

                await api.put(`/users/${id}`, { weight: parseFloat(value) }, { headers });

                dispatch(setUserInfo({ weight: parseFloat(value) }));

                dispatch(setUserMetrics({ weight: parseFloat(value) }));

                throwSuccessToast({
                    title: 'Peso atualizado com sucesso 😊',
                    message: 'Seu peso foi atualizado! ',
                });
                setLoading(false);
                navigate(RouteNames.logged.measures);
            } catch (err) {
                console.error('Ocorreu um erro ao salvar as informações de tamanho', err);
            }
        },
        [dispatch, id, navigate, parseDataToApi, token]
    );

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Animated.View
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, opacity: fadeAnim }}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    backgroundColor: 'transparent',
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <S.ModalContainer>
                    <View
                        style={{
                            position: 'absolute',
                            top: 32,
                            left: 24,
                            zIndex: 10,
                        }}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <ArrowDown />
                        </TouchableOpacity>
                    </View>
                    <S.ModatTitle>Digite o novo peso</S.ModatTitle>
                    <S.ModalInput
                        value={valueWeight.toString()}
                        onChangeText={value => {
                            setValueWeight(value.replace(',', '.'));
                        }}
                        keyboardType={Platform.select({
                            ios: 'decimal-pad',
                            android: 'numeric',
                        })}
                        // placeholder="Digite o novo peso"
                        textAlign="center"
                        inputMode="decimal"
                    />
                    <S.ButtonModal
                        onPress={() => {
                            sendWeightToApi(valueWeight);
                        }}>
                        {loading && <ActivityIndicator size="small" color="#fff" />}
                        {!loading && <S.ButtonModalText>Salvar novo peso</S.ButtonModalText>}
                    </S.ButtonModal>
                </S.ModalContainer>
            </KeyboardAvoidingView>
        </Animated.View>
    );
};

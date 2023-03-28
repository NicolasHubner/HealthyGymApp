import { api } from '@/services/api';
import { RootState } from '@/store';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { InsertMeasuresText, WeightTextSmall } from './style';

interface RenderPickerContentProps {
    weight: number;
}

export function RenderPickerContent({ weight }: RenderPickerContentProps) {
    const [isEditable, setIsEditable] = useState(false);
    const [newWeight, setNewHeight] = useState('');
    const [error, setError] = useState({
        hasError: false,
        message: '',
    });

    const { token, id } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();

    const heightInputRef = useRef<TextInput>(null);

    const handleToggleEditability = () => {
        setIsEditable(current => !current);
    };

    const parseDataToApi = useCallback(
        (weightParam: string) => {
            const data = {
                data: {
                    datetime: new Date().toISOString(),
                    weight: parseFloat(weightParam),
                    user: id,
                },
            };

            return data;
        },
        [id]
    );

    const sendWeightToApi = useCallback(
        async (value: string) => {
            if (value.length <= 0) {
                setIsEditable(false);
                return;
            }

            try {
                const headers = generateAuthHeaders(token!);
                const dataToApi = parseDataToApi(value);
                await api.post('/weight-histories', dataToApi, { headers });
                setIsEditable(false);
            } catch (err) {
                console.error('Ocorreu um erro ao salvar as informações de tamanho', err);
            }
        },
        [parseDataToApi, token]
    );

    useEffect(() => {
        if (isEditable && heightInputRef?.current) {
            heightInputRef?.current?.focus();
        }
    }, [isEditable]);

    useEffect(() => {
        setNewHeight(current => {
            if (current.length >= 5 && (current.slice(-1) === '.' || current.slice(-2) === '.')) {
                setError({
                    hasError: true,
                    message: 'Insira um peso válido',
                });

                return current;
            }

            setError({
                hasError: false,
                message: '',
            });
            return current;
        });
    }, [newWeight]);

    return (
        <TouchableOpacity onPress={handleToggleEditability}>
            {!isEditable && (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Rubik_700Bold',
                                color: '#2c2c2c',
                                letterSpacing: 0.5,
                                fontSize: 48,
                            }}>
                            {newWeight.length <= 0 ? weight : newWeight}
                        </Text>
                        <WeightTextSmall>kg</WeightTextSmall>
                    </View>
                    <InsertMeasuresText>Insira seu peso atual</InsertMeasuresText>
                </View>
            )}

            {isEditable && (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <TextInput
                            ref={heightInputRef}
                            placeholder="00kg"
                            maxLength={6}
                            keyboardType="numeric"
                            returnKeyType="done"
                            value={newWeight}
                            onChangeText={e => setNewHeight(e.replace(/,/g, '.'))}
                            style={{
                                fontFamily: 'Rubik_700Bold',
                                color: '#2c2c2c',
                                letterSpacing: 0.5,
                                fontSize: 40,
                                flexGrow: 1,
                                marginLeft: 8,
                                paddingHorizontal: 8,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{ paddingBottom: 8 }}
                        onPress={() => sendWeightToApi(newWeight)}>
                        <InsertMeasuresText>Salve seu novo peso</InsertMeasuresText>
                    </TouchableOpacity>
                    {error.hasError && (
                        <InsertMeasuresText
                            style={{
                                color: colors.red[500],
                                fontSize: 12,
                                textDecorationLine: 'none',
                            }}>
                            Insira um peso válido
                        </InsertMeasuresText>
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
}

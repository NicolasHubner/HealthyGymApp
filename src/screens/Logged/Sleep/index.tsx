import { weightArray } from '@/helpers/constants/weight';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    AddAlarmContainer,
    AddAlarmText,
    AlarmSwitch,
    BackArrow,
    ClockTimeContainer,
    PageSubtitle,
    PageTitle,
    PageTitleContainer,
    Picker,
} from './styles';

export function Sleep() {
    const [alarmSelected, setAlarmSelected] = useState(true);

    const [hour, setHour] = useState(4);
    const [minutes, setMinutes] = useState(0);

    const handleSelectAlarm = () => {
        setAlarmSelected(current => !current);
    };

    const weightMemo = useMemo(() => {
        return weightArray();
    }, []);

    return (
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', flex: 1 }}>
            <View
                style={{
                    backgroundColor: '#fff',
                    height: '70%',
                    width: '100%',
                    marginTop: 'auto',
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    padding: 24,
                }}>
                <View style={{ width: 32 }}>
                    <TouchableOpacity>
                        <BackArrow />
                    </TouchableOpacity>
                </View>

                <PageTitleContainer>
                    <PageTitle>Que horas você gostaria de dormir?</PageTitle>
                    <PageSubtitle>
                        Defina um lembrete para alertá-lo em que ponto você deve dormir
                    </PageSubtitle>
                </PageTitleContainer>
                <ClockTimeContainer>
                    <Picker
                        onChanged={setHour}
                        options={Array.from({ length: 24 }, (_, i) => ({
                            value: i,
                            text: String(i).padStart(2, '0'),
                        }))}
                        style={{
                            fontFamily: 'Rubik_700Bold',
                            color: '#2c2c2c',
                            letterSpacing: 0.5,
                            marginBottom: 5,
                            marginLeft: 18,
                            marginRight: -8,
                            padding: 5,
                            fontSize: 48,
                        }}
                        value={hour}
                    />
                    <Picker
                        onChanged={setMinutes}
                        options={Array.from({ length: 60 }, (_, i) => ({
                            value: i,
                            text: String(i).padStart(2, '0'),
                        }))}
                        textAlign="right"
                        style={{
                            fontFamily: 'Rubik_700Bold',
                            color: '#2c2c2c',
                            letterSpacing: 0.5,
                            marginBottom: 5,
                            marginLeft: 18,
                            marginRight: -8,
                            padding: 5,
                            fontSize: 48,
                        }}
                        value={minutes}
                    />
                </ClockTimeContainer>

                <AddAlarmContainer>
                    <AddAlarmText>Adicionar som de alarme</AddAlarmText>
                    <AlarmSwitch
                        value={alarmSelected}
                        onChange={handleSelectAlarm}
                        thumbColor={alarmSelected ? '#EADDFF' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </AddAlarmContainer>
            </View>
        </View>
    );
}

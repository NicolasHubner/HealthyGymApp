import { ClockTimeContainer, Picker, PickerSeparator } from './styles';

interface TimePickerProps {
    hour: number;
    minutes: number;
    setHour: (hour: number) => void;
    setMinutes: (minutes: number) => void;
}

export function TimePicker({ hour, minutes, setHour, setMinutes }: TimePickerProps) {
    return (
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
                    marginRight: -4,
                    padding: 5,
                    fontSize: 48,
                }}
                value={hour}
            />
            <PickerSeparator>:</PickerSeparator>
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
                    marginLeft: -4,
                    padding: 5,
                    fontSize: 48,
                }}
                value={minutes}
            />
        </ClockTimeContainer>
    );
}

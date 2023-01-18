import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { LogoWoman } from '@/components/atoms/Logo';
import { Controller, useForm } from 'react-hook-form';
import { TextRequired } from '@/components/atoms/TextRequired';
import {
    ButtonContainer,
    ContainerKGandM,
    InputContainer,
    InputContainerWeightAndHeight,
    Inputs,
    InputWeightAndHeight,
    InputBirthday,
    TextKGandM,
} from './style';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { DropDown } from './components/DropDown';
import { Button } from '@/components/atoms/Button';
import { TextInputMask } from 'react-native-masked-input';

export function SingUpSizes() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            genre: '',
            birthday: '',
            weight: '',
            height: '',
        },
    });
    useEffect(() => {
        const genre = watch('genre');
        const birthday = watch('birthday');
        const weight = watch('weight');
        const height = watch('height');
        if (genre && birthday && weight && height) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [watch('genre'), watch('birthday'), watch('weight'), watch('height')]);

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <ScrollablePageWrapper>
            <LogoWoman />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="genre"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainer
                        style={{
                            width: '90%',
                        }}>
                        <MaterialIcons
                            name="group"
                            size={20}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 15, zIndex: 1 }}
                        />
                        <DropDown setGender={onChange} gender={value} />
                    </InputContainer>
                )}
            />
            {errors.genre && <TextRequired>This is required.</TextRequired>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="birthday"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainer>
                        <AntDesign
                            name="calendar"
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 30, zIndex: 1 }}
                        />
                        {/* <Inputs
                            onChangeText={onChange}
                            keyboardType="numeric"
                            onBlur={onBlur}
                            value={value}
                            placeholder="Data de nascimento"
                        /> */}
                        <InputBirthday
                            type="datetime"
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            // style={[styles.styleInput, profile.birthday.length > 9 && validation[0].confirmed === false ? { borderColor: 'red' } : {borderWidth: 0}]}
                            placeholder="Data de nascimento (DD/MM/AAAA)"
                            placeholderTextColor="#9C9EB9"
                            value={value}
                            onChangeText={text => {
                                onChange(text);
                            }}
                        />
                    </InputContainer>
                )}
            />
            {errors.birthday && <TextRequired>This is required.</TextRequired>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="weight"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainerWeightAndHeight>
                        <Ionicons
                            name="person"
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 15, zIndex: 1 }}
                        />
                        <InputWeightAndHeight
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nome"
                        />
                        <ContainerKGandM>
                            <TextKGandM>KG</TextKGandM>
                        </ContainerKGandM>
                    </InputContainerWeightAndHeight>
                )}
            />
            {errors.weight && <TextRequired>This is required.</TextRequired>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="height"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainerWeightAndHeight>
                        <Ionicons
                            name="person"
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 15, zIndex: 1 }}
                        />
                        <InputWeightAndHeight
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Nome"
                        />
                        <ContainerKGandM>
                            <TextKGandM>M</TextKGandM>
                        </ContainerKGandM>
                    </InputContainerWeightAndHeight>
                )}
            />
            {errors.height && <TextRequired>This is required.</TextRequired>}

            <ButtonContainer>
                <Button isDisabled={isDisabled} label="Próximo" onPress={handleSubmit(onSubmit)} />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}

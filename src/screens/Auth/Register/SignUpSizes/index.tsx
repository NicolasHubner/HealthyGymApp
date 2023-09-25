import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Button } from '@/components/atoms/Button';
import { LogoWoman } from '@/components/atoms/Logo';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { RegisterInput } from '@/components/molecules/RegisterInput';
import { NewControlledInput } from '@/components/molecules/NewControlledInput';
import {
    ContainerKGandM,
    InputContainerWeightAndHeight,
    TextKGandM,
} from '@/components/organisms/ControlledInput/styles';

import { INavigation } from '@/helpers/interfaces/INavigation';
import { applyDateMask } from '@/helpers/functions/formatInputsFunctions';

import { RouteNames } from '@/routes/routes_names';

import { setUserInfo } from '@/store/user';
import { RootState } from '@/store';

import {
    ButtonContainer,
    DateInput,
    DateInputContainer,
    FormContainer,
    SexTextInfo,
    ViewContainerCheckBox,
} from './style';
import NewCheckBox from './components/newCheckBox/newCheckbox';
import { View } from 'react-native';

export function SingUpSizes() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [genreState, setGenreState] = useState('M');

    const navigation = useNavigation() as INavigation;

    const userState = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        birthdate: yup.string().required('Informe sua data de nascimento'),
        weight: yup.number().required('Informe seu peso'),
        height: yup.number().required('Informe sua altura'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const birthdate = watch('birthdate');
    const weight = watch('weight');
    const height = watch('height');

    const renderCustomControlledInput = () => {
        return (
            // <InputContainer
            //     style={{
            //         paddingLeft: 48,
            //         paddingVertical: 10,
            //         borderRadius: 8,
            //         backgroundColor: colors.gray[100],
            //         alignItems: 'center',
            //     }}>
            <View>
                <ViewContainerCheckBox>
                    <MaterialIcons
                        name="group"
                        size={20}
                        color="#7B6F72"
                        style={{ position: 'absolute', left: 15, zIndex: 1 }}
                    />
                    <NewCheckBox setGender={setGenreState} genreState={genreState} />
                </ViewContainerCheckBox>
                <SexTextInfo>
                    *Precisamos de saber seu sexo para indicar corretamente as alimentações e
                    treinos baseados no seu objetivo.
                </SexTextInfo>
            </View>
            // </InputContainer>
        );
    };

    const renderWeightAndHeightInput = ({
        onChange,
        onBlur,
        value,
        placeholder,
        unity,
        icon,
        maxLength = 6,
    }: any) => {
        return (
            <InputContainerWeightAndHeight>
                <RegisterInput
                    onChangeText={e => {
                        const parsedValue = e
                            .replace(/,/g, '.')
                            .replace(/-/g, '')
                            .replace(' ', '')
                            .replace(/\.+/g, '.');

                        onChange(parsedValue);
                        return;
                    }}
                    onBlur={onBlur}
                    value={value}
                    maxLength={maxLength}
                    secureTextEntry={false}
                    iconName={icon}
                    placeholder={placeholder}
                    keyboardType="numeric"
                />
                <ContainerKGandM>
                    <TextKGandM>{unity}</TextKGandM>
                </ContainerKGandM>
            </InputContainerWeightAndHeight>
        );
    };

    const onSubmit = (data: any) => {
        try {
            const { height: dataHeight, weight: dataWeight } = data;
            const [dia, mes, ano] = birthdate.split('/');
            const birthdateInDateFormat = new Date(`${ano}-${mes}-${dia}`);

            const parsedData = {
                ...userState,
                birthdate: birthdateInDateFormat?.toISOString(),
                gender: genreState,
                height: Number(String(dataHeight).replace(',', '.')),
                weight: Number(String(dataWeight).replace(',', '.')),
            };

            dispatch(setUserInfo(parsedData));

            navigation.navigate(RouteNames.auth.register.goals);
        } catch (err: any) {
            console.error('Ocorreu um erro ao definir as informações de tamanho do usuário.', err);
            console.error(err?.response?.message);
        }
    };

    const todayDateFormated = format(new Date(), 'dd/MM/yyyy');

    useEffect(() => {
        if (!!weight && !!height && !!birthdate) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [weight, height, birthdate]);

    return (
        <KeyboardAvoidingView
            style={{ width: '100%', flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollablePageWrapper bottomSpacing={140} styles={{ paddingTop: 60 }}>
                <LogoWoman />

                <FormContainer>
                    {renderCustomControlledInput()}

                    <NewControlledInput
                        control={control}
                        errors={errors}
                        name="birthdate"
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange: _, onBlur, value } }) => (
                            <DateInputContainer>
                                <AntDesign
                                    name="calendar"
                                    size={17}
                                    color="#7B6F72"
                                    style={{ position: 'absolute', left: 16, zIndex: 1 }}
                                />
                                <DateInput
                                    maxLength={10}
                                    onChange={e => {
                                        setValue('birthdate', applyDateMask(e.nativeEvent.text));
                                    }}
                                    style={{
                                        fontFamily: 'Rubik_400Regular',
                                        fontSize: 14,
                                        color: '#7B6F72',
                                        paddingLeft: 48,
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    secureTextEntry={false}
                                    placeholder={'Sua Data de Nasc.'}
                                    keyboardType="numeric"
                                />
                            </DateInputContainer>
                        )}
                    />

                    <NewControlledInput
                        control={control}
                        errors={errors}
                        name="weight"
                        rules={{
                            required: true,
                        }}
                        render={({ field }) =>
                            renderWeightAndHeightInput({
                                ...field,
                                placeholder: 'Seu peso',
                                unity: 'KG',
                                icon: 'weight-kilogram',
                            })
                        }
                    />

                    <NewControlledInput
                        control={control}
                        errors={errors}
                        name="height"
                        rules={{
                            required: true,
                        }}
                        render={({ field }) =>
                            renderWeightAndHeightInput({
                                ...field,
                                placeholder: 'Sua altura',
                                unity: 'M',
                                icon: 'ruler-square',
                                maxLength: 4,
                            })
                        }
                    />
                </FormContainer>

                <ButtonContainer>
                    <Button
                        isDisabled={isDisabled}
                        label="Próximo"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ButtonContainer>
            </ScrollablePageWrapper>
        </KeyboardAvoidingView>
    );
}

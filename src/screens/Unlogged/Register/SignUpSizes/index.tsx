import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { DropDown } from './components/DropDown';
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
    InputContainer,
} from './style';

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
            <InputContainer>
                <MaterialIcons
                    name="group"
                    size={20}
                    color="#7B6F72"
                    style={{ position: 'absolute', left: 15, zIndex: 1 }}
                />
                <DropDown setGender={setGenreState} gender={genreState} />
            </InputContainer>
        );
    };

    const renderWeightAndHeightInput = ({ onChange, onBlur, value, placeholder, unity }: any) => {
        return (
            <InputContainerWeightAndHeight>
                <RegisterInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={false}
                    iconName="weight-kilogram"
                    placeholder={placeholder}
                    keyboardType="numbers-and-punctuation"
                />
                <ContainerKGandM>
                    <TextKGandM>{unity}</TextKGandM>
                </ContainerKGandM>
            </InputContainerWeightAndHeight>
        );
    };

    const onSubmit = (data: any) => {
        try {
            const { birthday, height: dataHeight, weight: dataWeight } = data;

            const parsedData = {
                ...userState,
                birthdate: birthday?.toISOString(),
                gender: genreState,
                height: dataHeight,
                weight: dataWeight,
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
        <ScrollablePageWrapper>
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
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={false}
                                placeholder={todayDateFormated}
                                keyboardType="numbers-and-punctuation"
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
                            unity: 'H',
                        })
                    }
                />
            </FormContainer>

            <ButtonContainer>
                <Button isDisabled={isDisabled} label="Próximo" onPress={handleSubmit(onSubmit)} />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}

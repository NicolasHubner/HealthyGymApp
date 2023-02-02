import React, { useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Button } from '@/components/atoms/Button';
import { LogoWoman } from '@/components/atoms/Logo';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { ControlledInput } from '@/components/organisms/ControlledInput';

import { DropDown } from './components/DropDown';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';

import { ButtonContainer, InputContainer, InputDateContainer, TextDateShow } from './style';
import { dateConverter } from '@/helpers/functions/dateConverter';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { NewControlledInput } from '@/components/molecules/NewControlledInput';
import { useTheme } from 'styled-components';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ContainerKGandM,
  InputContainerWeightAndHeight,
  TextKGandM,
} from '@/components/organisms/ControlledInput/styles';
import { RegisterInput } from '@/components/molecules/RegisterInput';
import { Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootState } from '@/store';

export function SingUpSizes() {
  const navigation = useNavigation() as INavigation;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [genreState, setGenreState] = useState('M');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const userState = useSelector((state: RootState) => state.user);

  const { colors } = useTheme();

  const dispatch = useDispatch();

  const formSchema = yup.object().shape({
    birthday: yup.date().required('Informe sua data de nascimento'),
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

  const weight = watch('weight');
  const height = watch('height');

  const onDateTimePickerChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDatePickerVisible(false);
    if (!selectedDate) return;

    setDate(new Date(selectedDate));
  };

  const renderCustomControlledInput = () => {
    return (
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
        <DropDown setGender={setGenreState} gender={genreState} />
      </InputContainer>
    );
  };

  const renderBirthdayInput = () => {
    return (
      <InputContainer
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
        }}>
        <AntDesign
          name="calendar"
          size={17}
          color="#7B6F72"
          style={{ position: 'absolute', left: 15, zIndex: 1 }}
        />
        <InputDateContainer>
          <DateTimePicker
            value={date ?? new Date(new Date().getFullYear() - 12, 11, 31)}
            mode="date"
            onChange={(_, dateChanged) => {
              setDate(dateChanged);
              setValue('birthday', dateChanged);
            }}
            display="default"
            positiveButtonLabel="Confirmar"
            negativeButtonLabel="Cancelar"
            accentColor={colors.green[700]}
            maximumDate={new Date(new Date().getFullYear() - 12, 11, 31)}
            style={{
              width: 100,
            }}
          />
        </InputDateContainer>
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

  useEffect(() => {
    if (!!weight && !!height && !!date) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    // console.log({ date });
  }, [weight, height, date]);

  return (
    <ScrollablePageWrapper>
      <LogoWoman />

      {renderCustomControlledInput()}

      <NewControlledInput
        control={control}
        errors={errors}
        name="birthday"
        rules={{
          required: true,
        }}
        render={renderBirthdayInput}
      />

      <NewControlledInput
        control={control}
        errors={errors}
        name="weight"
        rules={{
          required: true,
        }}
        render={({ field }) =>
          renderWeightAndHeightInput({ ...field, placeholder: 'Seu peso', unity: 'KG' })
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
          renderWeightAndHeightInput({ ...field, placeholder: 'Sua altura', unity: 'H' })
        }
      />

      <ButtonContainer>
        <Button isDisabled={false} label="Próximo" onPress={handleSubmit(onSubmit)} />
      </ButtonContainer>
    </ScrollablePageWrapper>
  );
}

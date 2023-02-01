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
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';

export function SingUpSizes() {
  const navigation = useNavigation() as INavigation;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [date, setDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
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

  const genre = watch('genre');
  const weight = watch('weight');
  const height = watch('height');

  const onDateTimePickerChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
    setDatePickerVisible(false);
    if (!selectedDate) return;

    setDate(new Date(selectedDate));
  };

  const renderCustomControlledInput = ({
    onChange,
    value,
  }: Partial<ControllerRenderProps<FieldValues, string>>) => {
    if (!onChange) return <></>;

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
        <DropDown setGender={onChange} gender={value} />
      </InputContainer>
    );
  };

  const onSubmit = (data: any) => {
    const parsedData = {
      ...data,
      birthday: date?.toISOString(),
    };
    // const newData = {
    //   ...user,
    //   ...parsedData,
    // };
    dispatch(setUserInfo(parsedData));
    // console.log(parsedData);
    navigation.navigate(RouteNames.auth.register.goals);
  };

  useEffect(() => {
    if (!!genre && !!weight && !!height && !!date) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    // console.log({ date });
  }, [genre, weight, height, date]);

  return (
    <ScrollablePageWrapper>
      <LogoWoman />

      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="genre"
        errorMessage="É necessário selecionar seu gênero"
        iconName="weight-kilogram"
        render={renderCustomControlledInput}
      />

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
          onPress={() => setDatePickerVisible(true)}
        />
        <InputDateContainer>
          <TextDateShow>{date ? `${dateConverter(date)}` : 'Data de nascimento'}</TextDateShow>
        </InputDateContainer>
        {datePickerVisible && (
          <DateTimePicker
            style={{ position: 'absolute', zIndex: 1, right: 100 }}
            testID="dateTimePicker"
            value={new Date(1997, 2, 1)}
            onChange={onDateTimePickerChange}
            mode="date"
            display="default"
            is24Hour
            maximumDate={new Date()}
          />
        )}
      </InputContainer>

      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="weight"
        errorMessage="É necessário informar seu peso"
        placeholder="Seu peso"
        iconName="weight-kilogram"
        keyboardType="numeric"
        unitIndicador="KG"
      />

      <ControlledInput
        hookFormValidations={{ control, errors }}
        inputName="height"
        errorMessage="É necessário informar sua altura"
        placeholder="Sua altura"
        iconName="ruler"
        keyboardType="numeric"
        unitIndicador="M"
      />

      <ButtonContainer>
        <Button isDisabled={isDisabled} label="Próximo" onPress={handleSubmit(onSubmit)} />
      </ButtonContainer>
    </ScrollablePageWrapper>
  );
}

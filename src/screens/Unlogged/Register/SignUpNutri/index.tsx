import React, { useCallback, useState } from 'react';

import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Button } from '@/components/atoms/Button';
import { NutriBanner } from '@/assets/nutri_banner';
import {
    ButtonContainer,
    CardCheckbox,
    CardContainer,
    CardImage,
    CardText,
    RestrictionsList,
    Title,
} from './styles';

import { useTheme } from 'styled-components';

import { foodRestrictionsList } from '@/helpers/constants/nutri';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { RootState } from '@/store';
import { api } from '@/services/api';
import { User } from '@/types/user';
import { emptyGoalsForGlobalState, emptyMetricsForGlobalState } from '@/helpers/constants/goals';
import { throwErrorToast } from '@/helpers/functions/handleToast';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';

export function SignUpNutri() {
    const navigator = useNavigation() as any;
    const [restrictionsList, setRestrictionsList] = useState<string[]>([]);
    const dispatch = useDispatch();

    const userState = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();

    const handleRestrictionsList = async (restriction: string) => {
        if (restrictionsList.includes(restriction)) {
            setRestrictionsList(current => current.filter(item => item !== restriction));
        } else {
            setRestrictionsList(current => [...current, restriction]);
        }
    };

    const renderItem = (
        item: { title: string; image: NodeRequire },
        index: React.Key | null | undefined
    ) => {
        const image = item?.image ?? '';
        return (
            <CardContainer key={index}>
                <CardImage source={image as any} resizeMode="contain" />
                <CardText>{item?.title ?? 'Item'}</CardText>
                <CardCheckbox
                    value={restrictionsList.includes(item?.title)}
                    onValueChange={() => handleRestrictionsList(item?.title)}
                    color={restrictionsList.includes(item?.title) ? colors.green[500] : undefined}
                />
            </CardContainer>
        );
    };

    const parseDataToApi = useCallback((weightParam: string, id: number) => {
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
    }, []);

    const handleFinishRegister = async () => {
        try {
            const userDataForRegister = {
                username: userState.email,
                email: userState.email,
                password: userState.passwordForRegister,
                birthdate: userState.birthdate,
                gender: userState.gender,
                goal_type: userState.goal_type,
                name: userState.name,
                phone: userState.phone,
                weight: userState.weight,
                height: userState.height,
            };

            const response = await api.post('auth/local/register', userDataForRegister);

            const { jwt, user } = response.data;

            const userInfoAfterRegister: User = {
                ...user,
                token: jwt,
                passwordForRegister: undefined,
                metrics: emptyMetricsForGlobalState,
                goals: emptyGoalsForGlobalState,
                isCoach: false,
            };

            const headers = generateAuthHeaders(userInfoAfterRegister.token!);

            await api.post(
                '/weight-histories',
                parseDataToApi(userState.weight?.toString() || '', response.data.user.id),
                { headers }
            );

            dispatch(setUserInfo(userInfoAfterRegister));

            navigator.navigate(RouteNames.auth.register.finishRegister, {
                userInfoAfterRegister,
                foodRestrictionsList,
            });
        } catch (err: any) {
            console.error('Ocorreu um erro ao realizar o cadastro.', err);

            if (err?.response?.status === 400) {
                throwErrorToast({
                    title: 'E-mail já cadastrado ❌',
                    message: 'Já existe uma conta registrada com esse e-mail.',
                });
            } else {
                throwErrorToast({
                    title: 'Erro ao realizar o cadastro ❌',
                    message: 'Ocorreu um erro ao realizar o cadastro. Por favor, tente novamente.',
                });
            }
        }
    };
    return (
        <ScrollablePageWrapper bottomSpacing>
            <NutriBanner />
            <Title>Alguma restrição alimentar?</Title>

            <RestrictionsList>
                {foodRestrictionsList.map((item, index) => {
                    return renderItem(item, index);
                })}
            </RestrictionsList>

            <ButtonContainer>
                <Button onPress={handleFinishRegister} label="Cadastrar" />
            </ButtonContainer>
        </ScrollablePageWrapper>
    );
}

import { Button } from '@/components/atoms/Button';
import { ImageCorrectLogo } from '@/components/atoms/Images';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ButtonContainer } from './style';
import { RouteNames } from '@/routes/routes_names';
import { removeAccentFromString } from '@/utils/removeAccent';
import { useCallback, useEffect } from 'react';
import { User } from '@/types/user';
import { api } from '@/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { RootState } from '@/store';

export const FinishRegister = () => {
    const navigator = useNavigation() as INavigation;
    const route = useRoute();
    const dispatch = useDispatch();

    const userState = useSelector((state: RootState) => state.user);

    const sendDataToApi = useCallback(
        async (userInfoAfterRegister: User, foodRestrictionsList: any[]) => {
            try {
                const restrictionsToSend = foodRestrictionsList
                    ?.map(food => removeAccentFromString(food?.title?.toLowerCase()))
                    ?.join(',')
                    ?.replaceAll(' ', '-');

                const dataToPost = {
                    user: userInfoAfterRegister.id,
                    restriction: restrictionsToSend,
                };

                await api.post(
                    '/food-restrictions',
                    { data: { ...dataToPost } },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfoAfterRegister.token}`,
                        },
                    }
                );
            } catch (err) {
                console.error('Ocorreu um erro ao registrar as restrições alimentares', err);
            }
        },
        []
    );

    useEffect(() => {
        if (!!route && !!route.params) {
            const { params } = route as any;
            const { userInfoAfterRegister, foodRestrictionsList } = params;

            sendDataToApi(userInfoAfterRegister, foodRestrictionsList);
        }
    }, [route, sendDataToApi]);

    const handleNavigate = async () => {
        await Promise.all([
            dispatch(
                setUserInfo({
                    ...userState,
                    isLogged: true,
                })
            ),
            navigator.navigate(RouteNames.logged.home),
        ]);
    };

    return (
        <PageWrapper
            styles={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TextSubTitleGreen>Cadastro Finalizado com Sucesso!</TextSubTitleGreen>
            <ImageCorrectLogo />
            <ButtonContainer>
                <Button label="Próximo" onPress={handleNavigate} />
            </ButtonContainer>
        </PageWrapper>
    );
};

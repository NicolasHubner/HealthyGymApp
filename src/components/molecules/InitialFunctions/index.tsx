import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import jwt_decode from 'jwt-decode';
import { format } from 'date-fns';

import { clearUserInfo, setUserGoals, setUserInfo, setUserMetrics } from '@/store/user';
import { getFineshapeDataFromStorage, getUserDataFromStorage } from '@/utils/handleStorage';
import { emptyGoalsForGlobalState, emptyMetricsForGlobalState } from '@/helpers/constants/goals';
import { getGoalsUser } from '@/helpers/functions/goals/goals_type';
import { setFineShapeIntoState } from '@/store/fineshape';

export function InitialFunctions() {
    const dispatch = useDispatch();

    const getUserFromStorage = useCallback(async () => {
        const userFromStorage = await getUserDataFromStorage();

        if (userFromStorage) {
            try {
                const decoded = jwt_decode(userFromStorage.token!) as any;

                const expiresTime = decoded?.exp * 1000;
                const today = new Date().getTime();

                if (expiresTime < today) {
                    console.log('Usuário deslogado. Seu token expirou!', expiresTime);
                    dispatch(clearUserInfo());
                    return;
                }

                console.log(
                    `Usuário logado. Expira em ${format(expiresTime, 'dd/MM/yyyy HH:mm:ss')}`
                );

                const goals = getGoalsUser({
                    goal_type: userFromStorage?.goal_type as string,
                    weight: userFromStorage?.weight as number,
                    gender: userFromStorage?.gender as string,
                });

                dispatch(setUserInfo(userFromStorage));
                dispatch(
                    setUserMetrics({
                        ...emptyMetricsForGlobalState,
                        weight: userFromStorage?.weight ?? 0,
                        waterGlassSize: userFromStorage?.metrics?.waterGlassSize ?? 200,
                    })
                );
                dispatch(
                    setUserGoals({
                        ...emptyGoalsForGlobalState,
                        caloriesToBurn: 400,
                        sleepTime: 8,
                        caloriesToIngest: goals.cal_burn,
                        waterToIngest: goals.water_ingest,
                        proteinToIngest: goals.protein_burn,
                        carbsToIngest: goals.carbo_burn,
                        fatToIngest: goals.fat_burn,
                    })
                );
            } catch (err) {
                console.error('Não foi possível verificar o token', err);
            }
        }
    }, [dispatch]);

    const getUserFineShapeFromStorage = useCallback(async () => {
        const fineShapeFromStorage = await getFineshapeDataFromStorage();

        if (fineShapeFromStorage) {
            dispatch(setFineShapeIntoState(fineShapeFromStorage));
        }
    }, [dispatch]);

    useEffect(() => {
        getUserFromStorage();
    }, [getUserFromStorage]);

    useEffect(() => {
        getUserFineShapeFromStorage();
    }, [getUserFineShapeFromStorage]);

    return null;
}

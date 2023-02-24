import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import jwt_decode from 'jwt-decode';
import { format } from 'date-fns';

import { getUserDataFromStorage } from '@/utils/handleStorage';
import { clearUserInfo, setUserInfo } from '@/store/user';

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
                dispatch(setUserInfo(userFromStorage));
            } catch (err) {
                console.error('Não foi possível verificar o token', err);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        getUserFromStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

import { useDispatch } from 'react-redux';
import { getUserDataFromStorage } from '@/utils/handleStorage';
import { setUserInfo } from '@/store/user';
import { useCallback, useEffect } from 'react';

export function InitialFunctions() {
  const dispatch = useDispatch();

  const getUserFromStorage = useCallback(async () => {
    const userFromStorage = await getUserDataFromStorage();

    if (userFromStorage) {
      dispatch(setUserInfo(userFromStorage));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

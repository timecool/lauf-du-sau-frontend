import type { AxiosResponse } from 'axios';

import type { IUser, IUserResponse } from '@/models/user';
import { useAuthStore } from '@/store/auth';

import { api } from '../api-client';

export const signIn = async (email: string, password: string) => {
  const { setUser } = useAuthStore.getState();

  try {
    const response: AxiosResponse<IUserResponse> = await api.post(
      '/user/login',
      { email, password }
    );
    setUser(response.data.user);
    return undefined;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const signUp = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const { setUser } = useAuthStore.getState();
    const response: AxiosResponse<IUserResponse> = await api.post(
      '/user/register',
      {
        email,
        username,
        password,
      }
    );
    setUser(response.data.user);
    return undefined;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const logout = async () => {
  const { setUser } = useAuthStore.getState();
  await api.delete('/user/logout');
  setUser(undefined);
};

export const me = async (): Promise<IUser | undefined> => {
  const { setUser } = useAuthStore.getState();

  try {
    const response: AxiosResponse<IUserResponse> = await api.get('/user/me');
    setUser(response.data.user);
  } catch (error: unknown) {
    setUser(undefined);
  }
  return undefined;
};

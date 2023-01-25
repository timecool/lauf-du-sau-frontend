import { isEmpty } from 'lodash';

import type { IUpdateUser } from '@/models/user';
import { useAuthStore } from '@/store/auth';

import { api } from '../api-client';

export const updateUser = async (update: IUpdateUser) => {
  try {
    const { setUser } = useAuthStore.getState();

    const formData = new FormData();
    if (!isEmpty(update.file)) formData.append('file', update.file);
    if (!isEmpty(update.username)) formData.append('username', update.username);
    if (!isEmpty(update.email)) formData.append('email', update.email);

    const response = await api.patch(`/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setUser(response.data.user);
  } catch (error: any) {
    if (!isEmpty(error?.response?.data?.error))
      return error.response.data.error;
    return 'something is wrong :D';
  }
  return '';
};

export const deleteUserImage = async () => {
  const { setUser } = useAuthStore.getState();
  const response = await api.delete(`/user/image`);
  setUser(response.data.user);
};

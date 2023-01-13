import { isEmpty } from 'lodash';

import { api } from '../api-client';

export const createRun = async (
  file: File,
  time: string,
  distance: string,
  date: string
) => {
  if (isEmpty(file) || isEmpty(time) || isEmpty(distance) || isEmpty(date)) {
    return 'Please set all fields';
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('distance', distance);

    await api.post('/user/run', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    if (!isEmpty(error?.response?.data?.error))
      return error.response.data.error;
    return 'something is wrong :D';
  }
  return '';
};

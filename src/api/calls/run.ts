import type { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';

import type { IRun, IUpdateRun } from '@/models/run';

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

export const getMyRuns = async (month?: string) => {
  try {
    const response: AxiosResponse<IRun[]> = await api.get('/user/runs', {
      params: { month },
    });
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

export const updateRun = async (runId: string, update: IUpdateRun) => {
  try {
    const formData = new FormData();
    if (!isEmpty(update.file)) formData.append('file', update.file);
    if (!isEmpty(update.date)) formData.append('date', update.date);
    if (!isEmpty(update.time)) formData.append('time', update.time);
    if (!isEmpty(update.distance)) formData.append('distance', update.distance);

    await api.patch(`/user/run/${runId}`, formData, {
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

export const deleteRun = async (id: string) => {
  try {
    await api.delete(`/user/run/${id}`);
    return true;
  } catch (error: any) {
    return false;
  }
};

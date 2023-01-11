import type { AxiosResponse } from 'axios';

import type { IUserRuns } from '@/models/runs';

import { api } from '../api-client';

export const runForVerify = async () => {
  try {
    const response: AxiosResponse<IUserRuns[]> = await api.get('/runs/verify');
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

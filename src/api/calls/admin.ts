import type { AxiosResponse } from 'axios';
import { isEmpty, isEqual } from 'lodash';

import type { IUserRuns } from '@/models/runs';
import { ERunStatus } from '@/models/runs';

import { api } from '../api-client';

export const runForVerify = async () => {
  try {
    const response: AxiosResponse<IUserRuns[]> = await api.get('/runs/verify');
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

export const runStatusChange = async (
  uuid: string,
  status: ERunStatus,
  message?: string
) => {
  if (isEqual(status, ERunStatus.DECLINE) && isEmpty(message)) {
    return 'Please set a Message';
  }

  try {
    await api.patch(`/user/run/${uuid}/status`, { status, message });
    return '';
  } catch (error: any) {
    if (!isEmpty(error?.response?.data?.error))
      return error.response.data.error;
    return 'something is wrong :D';
  }
};

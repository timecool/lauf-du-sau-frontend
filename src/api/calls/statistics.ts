import type { AxiosResponse } from 'axios';

import type { ILeaderboardUser } from '@/models/leaderboard';
import type { IRunResponse } from '@/models/run';
import type { ITotal } from '@/models/total';

import { api } from '../api-client';

export const getLeaderboard = async (month?: string) => {
  try {
    const response: AxiosResponse<ILeaderboardUser[]> = await api.get(
      '/statistics/leaderboard',
      { params: { month } }
    );
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

export const getNewRuns = async () => {
  try {
    const response: AxiosResponse<IRunResponse[]> = await api.get('/runs/new');
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

export const getTotal = async () => {
  try {
    const response: AxiosResponse<ITotal> = await api.get('/statistics/total');
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

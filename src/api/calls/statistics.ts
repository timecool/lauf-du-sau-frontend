import type { AxiosResponse } from 'axios';

import type { ILeaderboardUser } from '@/models/leaderboard';

import { api } from '../api-client';

export const getLeaderboard = async (month?: string) => {
  console.log(month);
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

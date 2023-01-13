import type { AxiosResponse } from 'axios';

import type { ILeaderboardUser } from '@/models/leaderboard';

import { api } from '../api-client';

export const getLeaderboard = async () => {
  try {
    const response: AxiosResponse<ILeaderboardUser[]> = await api.get(
      '/statistics/leaderboard'
    );
    return response.data;
  } catch (error: any) {
    return undefined;
  }
};

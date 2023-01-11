import type { IUser } from './user';

export interface IUserRuns extends IUser {
  runs: IRun[];
}

export interface IRun {
  uuid?: string;
  create_at?: Date;
  date: Date;
  distance: number;
  messages?: any[];
  status: number;
  time?: number;
  url?: string;
  image_url?: string;
  runTime?: number;
}

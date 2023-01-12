import type { IUser } from './user';

export interface IUserRuns extends IUser {
  runs: IRun[];
}

export enum ERunStatus {
  ACTIVATE,
  VERIFY,
  DECLINE,
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
}

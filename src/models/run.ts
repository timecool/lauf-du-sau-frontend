import type { IUser } from './user';

export enum ERunStatus {
  ACTIVATE,
  VERIFY,
  DECLINE,
}

export interface IRun {
  id: string;
  user_id: string;
  date: Date;
  create_at: Date;
  time: number;
  distance: number;
  url: string;
  status: ERunStatus;
  messages: any[];
}

export interface IRunResponse {
  run: IRun;
  user: IUser;
}

export interface IUpdateRun {
  file?: File;
  date?: string;
  time?: string;
  distance?: string;
}

export interface IRunGroupByDay {
  date: Date;
  total: number;
  runs: IRun[];
}

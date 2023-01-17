import type { IResponse } from './response';

export interface IUserResponse extends IResponse {
  user?: IUser;
}
export interface IUser {
  id: string;
  email: string;
  username: string;
  goal: number;
  image_url: string;
  role: string;
}

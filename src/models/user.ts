import type { IResponse } from './response';

export interface IUserResponse extends IResponse {
  user?: IUser;
}
export interface IUser {
  uuid: string;
  email: string;
  username: string;
  goal: number;
  image_url: string;
  role: string;
}

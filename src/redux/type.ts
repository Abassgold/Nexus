export interface IUser {
  input: string;
  password: string;
}
export interface findUser {
  email: string;
  userName: string;
  _id: string;
  role?: string;
  token?: string;
  msg?: string;
}
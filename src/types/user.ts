export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResponseLogin {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface IUserLoginData {
  email: string;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

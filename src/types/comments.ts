interface IUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IComment {
  id: string;
  date: string;
  user: IUser;
  comment: string;
  rating: number;
}

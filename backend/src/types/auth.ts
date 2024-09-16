export interface User {
  username: string;
  password?: string;
  passwordhash?: string;
  readonly id: number;
  fullName: string;
  avatar: string;
}

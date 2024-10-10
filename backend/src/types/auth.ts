export interface User {
  username: string;
  password?: string;
  passwordhash?: string;
  readonly id?: number;
  fullname: string;
  avatar: string;
}

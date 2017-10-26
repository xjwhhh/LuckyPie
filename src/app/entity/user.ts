export class User {
  id: number;
  account: string;
  password: string;
  gender: string;
  identify: string;
  name: string;
  birthday: string;
  telephone: number;
  email: string;
  follows: User[];
  folloers: User[];
}

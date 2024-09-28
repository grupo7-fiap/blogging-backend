export class User {
  id?: number;
  username: string;
  password: string;
  createdAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.createdAt = user.createdAt;
  }
}

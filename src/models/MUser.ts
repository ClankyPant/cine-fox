export class MUser {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

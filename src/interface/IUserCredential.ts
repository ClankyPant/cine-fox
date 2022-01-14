export default interface IUserCredential {
  user: IUser;
}

interface IUser {
  apiKey: string;
  uid: string;
}

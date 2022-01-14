export default class ResultRequest<T> {
  message: string;
  error: boolean;
  data: Array<T>;

  constructor(message: string) {
    this.message = message;
    this.error = false;
    this.data = [];
  }
}

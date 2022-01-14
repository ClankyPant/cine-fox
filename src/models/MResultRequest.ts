export class MResultRequest<T> {
  message: string;
  error: boolean;
  data!: T | Array<T>;

  constructor(message: string) {
    this.message = message;
    this.error = false;
  }
}

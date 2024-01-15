export interface IErrorHandler<T> {
  handle(input: unknown): T;
}

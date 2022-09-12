export interface IHttpService<T> {
  get(): Promise<T>
}

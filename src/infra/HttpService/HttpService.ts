import { IHttpService } from './interface'

export class HttpService<T> implements IHttpService<T> {
  constructor(private readonly url: string) {}

  public get(): Promise<T> {
    return fetch(this.url).then(this.handleErrors<T>)
  }

  private handleErrors<T>(response: Response): Promise<T> {
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
  }
}

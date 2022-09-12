import { IHttpService } from '../infra/HttpService/interface'
import { IResponse } from './interfaces'

export class NegotiationService {
  constructor(private readonly service: IHttpService<IResponse>) {}

  public async get(): Promise<IResponse> {
    return this.service.get()
  }
}

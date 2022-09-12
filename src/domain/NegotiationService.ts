import { IHttpService } from '../infra/HttpService/interface'
import { INegotiationResponse } from './interfaces'

export class NegotiationService {
  constructor(private readonly service: IHttpService<INegotiationResponse>) {}

  public async get(): Promise<INegotiationResponse> {
    return this.service.get()
  }
}

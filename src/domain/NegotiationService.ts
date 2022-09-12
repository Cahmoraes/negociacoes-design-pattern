import { IHttpService } from '../infra/HttpService/interface'
import { Negotiation } from './Negotiation'

export class NegotiationService {
  constructor(private readonly service: IHttpService<Negotiation[]>) {}

  public async get(): Promise<Negotiation[]> {
    return this.service.get()
  }
}

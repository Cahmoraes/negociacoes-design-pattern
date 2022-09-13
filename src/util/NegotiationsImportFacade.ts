import { IIDBResponse, Negotiation } from '../domain'
import { NegotiationImportMapper } from './DataMapper'

export class NegotiationsLoaderFacade {
  private static negotiationImportMapper = new NegotiationImportMapper()

  public static buildNegotiations(
    negotiationsResponse: IIDBResponse[],
  ): Negotiation[] {
    return this.negotiationImportMapper
      .setData(negotiationsResponse)
      .buildNegotiations()
  }
}

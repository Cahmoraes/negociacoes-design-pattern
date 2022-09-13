import { NegotiationLoadMapper } from './DataMapper/NegotiationLoadMapper'
import { INegotiationResponse } from '../domain/interfaces/INegotiationResponse'
import { Negotiation } from '../domain'

export class NegotiationsLoaderFacade {
  private static negotiationLoadMapper = new NegotiationLoadMapper()

  public static buildNegotiations(
    negotiationsResponse: INegotiationResponse[],
  ): Negotiation[] {
    return this.negotiationLoadMapper
      .setData(negotiationsResponse)
      .buildNegotiations()
  }
}

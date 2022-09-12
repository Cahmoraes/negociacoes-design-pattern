import { Negotiation } from '../../domain'
import { INegotiationResponse } from '../../domain/interfaces'
import { DateFormat } from '../DateFormat'
import { NegotiationDataMapper } from './interface/NegotiationDataMapper'

export class NegotiationLoadMapper extends NegotiationDataMapper<INegotiationResponse> {
  public buildNegotiations(): Negotiation[] {
    return this.negotiationsResponse.map(
      (negotiationResponse) =>
        new Negotiation(
          DateFormat.toDate(negotiationResponse.date),
          negotiationResponse.quantity,
          negotiationResponse.amount,
        ),
    )
  }
}

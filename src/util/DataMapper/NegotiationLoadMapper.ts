import { Negotiation } from '../../domain'
import { IResponse } from '../../domain/interfaces'
import { DateFormat } from '../DateFormat'
import { NegotiationDataMapper } from './interface/NegotiationDataMapper'

export class NegotiationLoadMapper extends NegotiationDataMapper<IResponse> {
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

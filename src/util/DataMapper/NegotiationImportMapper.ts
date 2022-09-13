import { IIDBResponse, Negotiation } from '../../domain'
import { NegotiationDataMapper } from './interface'

export class NegotiationImportMapper extends NegotiationDataMapper<IIDBResponse> {
  public buildNegotiations(): Negotiation[] {
    return this.negotiationsResponse.map(
      (negotiationResponse) =>
        new Negotiation(
          negotiationResponse._date,
          negotiationResponse._quantity,
          negotiationResponse._amount,
        ),
    )
  }
}

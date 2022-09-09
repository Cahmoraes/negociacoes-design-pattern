import { Negotiation } from '../../domain/Negotiation'
import { InvalidAmountError } from '../../util/errors/InvalidAmountError'
import { ValidateMiddleware } from './ValidateMiddleware'

export class ValidateAmountMiddleware extends ValidateMiddleware<Negotiation> {
  handle(data: Negotiation): boolean {
    if (!data.amount) {
      throw new InvalidAmountError()
    }

    return super.handleNext(data)
  }
}

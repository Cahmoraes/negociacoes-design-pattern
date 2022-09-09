import { Negotiation } from '../../domain/Negotiation'
import { InvalidQuantityError } from '../../util/errors/InvalidQuantityError'
import { ValidateMiddleware } from './ValidateMiddleware'

export class ValidateQuantityMiddleware extends ValidateMiddleware<Negotiation> {
  handle(data: Negotiation): boolean {
    if (data.quantity <= 0) {
      throw new InvalidQuantityError()
    }

    return super.handleNext(data)
  }
}

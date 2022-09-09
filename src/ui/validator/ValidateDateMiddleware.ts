import { Negotiation } from '../../domain/Negotiation'
import { InvalidDateError } from '../../util/errors/InvalidDateError'
import { ValidateMiddleware } from './ValidateMiddleware'

export class ValidateDateMiddleware extends ValidateMiddleware<Negotiation> {
  handle(data: Negotiation): boolean {
    if (!data.date) {
      throw new InvalidDateError()
    }

    return super.handleNext(data)
  }
}

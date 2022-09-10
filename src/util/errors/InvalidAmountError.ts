import { ApplicationError } from '.'

export class InvalidAmountError extends ApplicationError {
  constructor() {
    super('O valor da negociação está inválido')
  }
}

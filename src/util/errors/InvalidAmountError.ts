import { ApplicationError } from './ApplicationError'

export class InvalidAmountError extends ApplicationError {
  constructor() {
    super('O valor da negociação está inválido')
  }
}

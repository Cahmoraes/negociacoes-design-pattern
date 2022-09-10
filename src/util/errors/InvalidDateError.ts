import { ApplicationError } from './'

export class InvalidDateError extends ApplicationError {
  constructor() {
    super('A data da negociação está inválida')
  }
}

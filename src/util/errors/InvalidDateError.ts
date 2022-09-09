import { ApplicationError } from './ApplicationError'

export class InvalidDateError extends ApplicationError {
  constructor() {
    super('A data da negociação está inválida')
  }
}

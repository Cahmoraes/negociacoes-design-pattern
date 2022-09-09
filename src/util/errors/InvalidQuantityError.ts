import { ApplicationError } from './ApplicationError'

export class InvalidQuantityError extends ApplicationError {
  constructor() {
    super('A quantidade da negociação está inválida')
  }
}

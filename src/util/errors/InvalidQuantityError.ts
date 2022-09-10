import { ApplicationError } from '.'

export class InvalidQuantityError extends ApplicationError {
  constructor() {
    super('A quantidade da negociação está inválida')
  }
}

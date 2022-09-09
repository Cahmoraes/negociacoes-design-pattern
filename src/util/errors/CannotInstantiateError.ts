import { ApplicationError } from './ApplicationError'

export class CannotInstantiateError extends ApplicationError {
  constructor(name: string) {
    super(`A classe ${name} não pode ser instanciada`)
  }
}

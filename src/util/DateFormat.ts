import { CannotInstantiateError } from './errors/CannotInstantiateError'
export class DateFormat {
  constructor() {
    throw new CannotInstantiateError(DateFormat.name)
  }

  static format(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    })
  }
}

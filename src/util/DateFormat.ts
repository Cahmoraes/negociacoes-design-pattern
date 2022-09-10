import { CannotInstantiateError } from './errors/CannotInstantiateError'
export class DateFormat {
  constructor() {
    throw new CannotInstantiateError(DateFormat.name)
  }

  public static format(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    })
  }

  public static toDate(string: string): Date {
    const stringToDate = string.split('-').map(Number)
    return new Date(stringToDate[0], stringToDate[1] - 1, stringToDate[2])
  }
}

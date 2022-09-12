import { Negotiation } from '../../../domain'

export abstract class NegotiationDataMapper<T> {
  protected negotiationsResponse: T[] = []

  public abstract buildNegotiations(): Negotiation[]

  public setData(data: T[]): this {
    this.negotiationsResponse = data
    return this
  }
}

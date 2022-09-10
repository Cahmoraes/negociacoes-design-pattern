import {
  INegotiationListAction,
  NegotiationAction,
} from '../interface/INegotiationListAction'
import { IIObserver } from '../interface/IObserver'
import { Negotiation } from './Negotiation'

export class NegotiationList {
  private readonly _negotiations: Negotiation[] = []
  private observers = new Set<IIObserver<INegotiationListAction>>()

  get negotiations(): readonly Negotiation[] {
    return this._negotiations
  }

  public add(negotiation: Negotiation): void {
    if (this.isDuplicate(negotiation)) {
      return
    }

    this._negotiations.push(negotiation)
    this.notify('ADD')
  }

  public clear(): void {
    if (this._negotiations.length === 0) return

    this._negotiations.length = 0
    this.notify('CLEAR')
  }

  public subscribe(observer: IIObserver<INegotiationListAction>): void {
    this.observers.add(observer)
  }

  public unsubscribe(observer: IIObserver<INegotiationListAction>): void {
    this.observers.has(observer) && this.observers.delete(observer)
  }

  private notify(action: NegotiationAction): void {
    this.observers.forEach((observer) =>
      observer.update({ action, data: this }),
    )
  }

  private isDuplicate(negotiation: Negotiation): boolean {
    return this.negotiations.some((existingNegotiation) =>
      existingNegotiation.isEqual(negotiation),
    )
  }
}

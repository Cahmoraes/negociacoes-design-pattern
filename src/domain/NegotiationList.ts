import { IIObserver } from '../interface/IObserver'
import { Negotiation } from './Negotiation'

export class NegotiationList {
  private readonly _negotiations: Negotiation[] = []
  private observers = new Set<IIObserver<this>>()

  get negotiations(): readonly Negotiation[] {
    return this._negotiations
  }

  public add(negotiation: Negotiation): void {
    if (this.isDuplicate(negotiation)) {
      return
    }

    this._negotiations.push(negotiation)
    this.notify()
  }

  public clear(): void {
    if (this._negotiations.length === 0) return

    this._negotiations.length = 0
    this.notify()
  }

  public subscribe(observer: IIObserver<this>): void {
    this.observers.add(observer)
  }

  public unsubscribe(observer: IIObserver<this>): void {
    this.observers.has(observer) && this.observers.delete(observer)
  }

  private notify(): void {
    this.observers.forEach((observer) => observer.update(this))
  }

  private isDuplicate(negotiation: Negotiation): boolean {
    return this.negotiations.some((existingNegotiation) =>
      existingNegotiation.isEqual(negotiation),
    )
  }
}

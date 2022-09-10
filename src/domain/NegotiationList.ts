import { IIObserver } from '../interface/IObserver'
import { Negotiation } from './Negotiation'

export class NegotiationList {
  private readonly _negotiations: Negotiation[] = []
  private observers = new Set<IIObserver<this>>()

  get negotiations(): readonly Negotiation[] {
    return this._negotiations
  }

  public add(negotiation: Negotiation): void {
    this._negotiations.push(negotiation)
    this.notify()
  }

  public clear(): void {
    this._negotiations.length = 0
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
}
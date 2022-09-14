import {
  INegotiationListAction,
  INegotiationAction,
} from '../interface/INegotiationListAction'
import { IIObserver } from '../interface/IObserver'
import { eventEmitter } from '../util'
import { Negotiation } from './Negotiation'

export class NegotiationList {
  private readonly _negotiations: Negotiation[] = []
  private observers = new Set<IIObserver<INegotiationListAction>>()

  get negotiations(): readonly Negotiation[] {
    return this._negotiations
  }

  public add(negotiation: Negotiation): boolean {
    if (this.isDuplicate(negotiation)) {
      eventEmitter.emit('DUPLICATE', 'DUPLICATED')
      return false
    }

    this._negotiations.push(negotiation)
    this.notify('ADD')
    return true
  }

  public import(negotiations: Negotiation[]): void {
    this.filterDuplicateNegotiationsList(negotiations)
    this.notify('IMPORT')
  }

  public load(negotiations: Negotiation[]): void {
    this.filterDuplicateNegotiationsList(negotiations)
    this.notify('LOAD')
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

  public delete(negotiationToDelete: Negotiation): void {
    const indexNegotiationToDelete = this._negotiations.findIndex(
      (negotiation) => negotiation.isEqual(negotiationToDelete),
    )

    if (indexNegotiationToDelete < 0) return

    this._negotiations.splice(indexNegotiationToDelete, 1)
    this.notify('DELETE')
  }

  private notify(action: INegotiationAction): void {
    this.observers.forEach((observer) =>
      observer.update({ action, data: this }),
    )
  }

  private filterDuplicateNegotiationsList(negotiations: Negotiation[]): void {
    negotiations
      .filter((negotiation) => !this.isDuplicate(negotiation))
      .forEach((negotiation) => this._negotiations.push(negotiation))
  }

  private isDuplicate(negotiation: Negotiation): boolean {
    return this.negotiations.some((existingNegotiation) =>
      existingNegotiation.isEqual(negotiation),
    )
  }
}

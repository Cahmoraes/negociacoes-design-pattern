import { si } from '@cahmoraes93/simple-immuter'
import {
  INegotiationListAction,
  INegotiationAction,
  INegotiationTypes,
} from '../interface'
import { IIObserver } from '../interface/IObserver'
import { eventEmitter } from '../util'
import { Negotiation } from './Negotiation'

/**
 * Define NegotiationList Model
 * @date 04/10/2022 - 16:15:01
 *
 * @export
 * @class NegotiationList
 * @typedef {NegotiationList}
 */
export class NegotiationList {
  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @private
   * @readonly
   * @type {Negotiation[]}
   */
  private readonly _negotiations: Negotiation[] = []
  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @private
   * @type {*}
   */
  private observers = new Set<IIObserver<INegotiationListAction>>()

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @readonly
   * @type {readonly Negotiation[]}
   */
  get negotiations(): readonly Negotiation[] {
    return si.produce(this._negotiations)
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {Negotiation} negotiation
   * @returns {boolean}
   */
  public add(negotiation: Negotiation): boolean {
    if (this.isDuplicate(negotiation)) {
      eventEmitter.emit('DUPLICATE', INegotiationTypes.DUPLICATED)
      return false
    }

    this._negotiations.push(negotiation)
    this.notify(INegotiationTypes.ADD)
    return true
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {Negotiation[]} negotiations
   */
  public import(negotiations: Negotiation[]): void {
    this.getFilteredDuplicateNegotiationsList(negotiations).forEach(
      (negotiation) => this._negotiations.push(negotiation),
    )

    this.notify(INegotiationTypes.IMPORT)
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {Negotiation[]} negotiations
   */
  public load(negotiations: Negotiation[]): void {
    this.getFilteredDuplicateNegotiationsList(negotiations).forEach(
      (negotiation) => this._negotiations.push(negotiation),
    )

    this.notify(INegotiationTypes.LOAD)
  }

  /**
   * Get negotiation list without duplicated items
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {Negotiation[]} negotiations - Negotiations list to check
   * @returns {Negotiation[]} filtered negotiations list
   */
  public getFilteredDuplicateNegotiationsList(
    negotiations: Negotiation[],
  ): Negotiation[] {
    return negotiations.filter((negotiation) => !this.isDuplicate(negotiation))
  }

  /**
   * Clear negotiation list property
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   */
  public clear(): void {
    if (this._negotiations.length === 0) return

    this._negotiations.length = 0
    this.notify(INegotiationTypes.CLEAR)
  }

  /**
   * Subscribe to Subject to receive an event notification
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {IIObserver<INegotiationListAction>} observer
   */
  public subscribe(observer: IIObserver<INegotiationListAction>): void {
    this.observers.add(observer)
  }

  /**
   * Unsubscribe to Subject
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {IIObserver<INegotiationListAction>} observer
   */
  public unsubscribe(observer: IIObserver<INegotiationListAction>): void {
    this.observers.has(observer) && this.observers.delete(observer)
  }

  /**
   * Delete one negotiation at Negotiations list
   * @date 04/10/2022 - 16:15:01
   *
   * @public
   * @param {Negotiation} negotiationToDelete - Negotiation to delete
   */
  public delete(negotiationToDelete: Negotiation): void {
    const indexNegotiationToDelete = this._negotiations.findIndex(
      (negotiation) => negotiation.isEqual(negotiationToDelete),
    )

    if (indexNegotiationToDelete < 0) return

    this._negotiations.splice(indexNegotiationToDelete, 1)
    this.notify(INegotiationTypes.DELETE)
  }

  /**
   * Notify all observers when an event occurs
   * @date 04/10/2022 - 16:15:01
   *
   * @private
   * @param {INegotiationAction} action
   */
  private notify(action: INegotiationAction): void {
    this.observers.forEach((observer) =>
      observer.update({ action, data: this }),
    )
  }

  /**
   * Check if exists negotiation at Negotiations list
   * @date 04/10/2022 - 16:15:01
   *
   * @private
   * @param {Negotiation} negotiation
   * @returns {boolean} True: Negotiation is duplicate
   */
  private isDuplicate(negotiation: Negotiation): boolean {
    return this.negotiations.some((existingNegotiation) =>
      existingNegotiation.isEqual(negotiation),
    )
  }
}

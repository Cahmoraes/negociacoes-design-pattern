import { deepStrictEqual } from '@cahmoraes93/deep-strict-equal'

export class Negotiation {
  /**
   * Define a Negotiation Model
   * @date 04/10/2022 - 16:13:08
   *
   * @private
   * @readonly
   * @type {Date}
   */
  private readonly _date: Date

  /**
   * Creates an instance of Negotiation.
   * @date 04/10/2022 - 16:13:08
   *
   * @constructor
   * @param {Date} date
   * @param {number} _quantity
   * @param {number} _amount
   */
  constructor(
    date: Date,
    private readonly _quantity: number,
    private readonly _amount: number,
  ) {
    this._date = new Date(date.getTime())
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:13:08
   *
   * @readonly
   * @type {Date}
   */
  get date(): Date {
    return new Date(this._date.getTime())
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:13:08
   *
   * @readonly
   * @type {number}
   */
  get quantity(): number {
    return this._quantity
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:13:08
   *
   * @readonly
   * @type {number}
   */
  get amount(): number {
    return this._amount
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:13:08
   *
   * @readonly
   * @type {number}
   */
  get volume(): number {
    return this._amount * this._quantity
  }

  /**
   * Description placeholder
   * @date 04/10/2022 - 16:13:08
   *
   * @public
   * @param {Negotiation} negotiation
   * @returns {boolean}
   */
  public isEqual(negotiation: Negotiation): boolean {
    // return (
    //   this.date.getDate() === negotiation.date.getDate() &&
    //   this.date.getMonth() === negotiation.date.getMonth() &&
    //   this.date.getFullYear() === negotiation.date.getFullYear() &&
    //   this.amount === negotiation.amount &&
    //   this.quantity === negotiation.quantity
    // )
    console.log('--------------------------------')
    console.log('deepStrictEqual', deepStrictEqual(this, negotiation))
    console.log(this, negotiation)
    return deepStrictEqual(this, negotiation)
  }
}

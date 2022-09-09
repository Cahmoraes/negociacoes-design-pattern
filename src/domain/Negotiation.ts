export class Negotiation {
  private readonly _date: Date

  constructor(
    date: Date,
    private readonly _quantity: number,
    private readonly _amount: number,
  ) {
    this._date = new Date(date.getTime())
  }

  get date(): Date {
    return new Date(this._date.getTime())
  }

  get quantity(): number {
    return this._quantity
  }

  get amount(): number {
    return this._amount
  }

  get volume(): number {
    return this._amount * this._quantity
  }

  doThing() {
    console.log(`My value is ${this._amount}`)
  }
}

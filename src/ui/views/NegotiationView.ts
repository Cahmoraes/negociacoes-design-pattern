import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { NegotiationList } from '../../domain/NegotiationList'
import { Negotiation } from '../../domain/Negotiation'
import { DateFormat } from '../../util/DateFormat'

export class NegotiationView implements IIObserver<NegotiationList> {
  @domInjector('#negociacoes')
  private readonly element: IElement

  constructor() {
    this.init()
  }

  public update(negotiationList: NegotiationList): void {
    const tableRows = this.createTableRows(negotiationList.negotiations)
    this.print(tableRows)
  }

  private print(tableRows: HTMLTableRowElement[]): void {
    const oldTbodyEl = this.element!.querySelector('tbody')
    const newTbodyEl = document.createElement('tbody')

    newTbodyEl.append(...tableRows)
    oldTbodyEl?.replaceWith(newTbodyEl)
  }

  private createTable() {
    this.element!.innerHTML = /* html */ `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    `
  }

  private createTableRows(
    negotiations: readonly Negotiation[],
  ): HTMLTableRowElement[] {
    return negotiations.map((negotiation) => {
      const trEl = document.createElement('tr')

      trEl.onclick = () => this.handleClick(negotiation)
      trEl.innerHTML = /* html */ `
        <td>${DateFormat.format(negotiation.date)}</td>
        <td>${negotiation.quantity}</td>
        <td>${negotiation.amount}</td>
        <td>${negotiation.volume}</td>
      `

      return trEl
    })
  }

  private handleClick(negotiation: Negotiation) {
    console.log(negotiation)
  }

  private init() {
    this.createTable()
  }
}

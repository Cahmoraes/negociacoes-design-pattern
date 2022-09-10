import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { NegotiationList } from '../../domain/NegotiationList'
import { Negotiation } from '../../domain/Negotiation'
import { DateFormat } from '../../util/DateFormat'

export class NegotiationView implements IIObserver<NegotiationList> {
  @domInjector('#negociacoes')
  private readonly element: IElement

  @domInjector('.table')
  private readonly table: IElement<HTMLTableElement>

  constructor() {
    this.createTable()
  }

  public update(negotiationList: NegotiationList): void {
    this.print(this.createTableRows(negotiationList.negotiations))
  }

  private print(tableRows: HTMLTableRowElement[]): void {
    const oldTbodyEl = this.table?.querySelector('tbody')
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
    const tableRows = negotiations.map((negotiation) => {
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

    return tableRows
  }

  private handleClick(negotiation: Negotiation) {
    console.log(negotiation)
  }
}

import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { Negotiation } from '../../domain/Negotiation'
import { DateFormat } from '../../util/DateFormat'
import { INegotiationListAction } from '../../interface/INegotiationListAction'

export class NegotiationView implements IIObserver<INegotiationListAction> {
  @domInjector('#negociacoes')
  private readonly element: IElement

  constructor() {
    this.init()
  }

  public update({ data }: INegotiationListAction): void {
    const tableRows = this.createTableRows(data.negotiations)
    this.print(tableRows)
  }

  private print(tableRows: HTMLTableRowElement[]): void {
    const oldTbodyEl = this.element!.querySelector('tbody')
    const newTbodyEl = document.createElement('tbody')

    newTbodyEl.append(...tableRows)
    oldTbodyEl?.replaceWith(newTbodyEl)
  }

  private createTable(): void {
    this.element!.innerHTML = /* html */ `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
            <th>AÇÃO</th>
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

      trEl.innerHTML = /* html */ `
        <td>${DateFormat.format(negotiation.date)}</td>
        <td>${negotiation.quantity}</td>
        <td>${negotiation.amount}</td>
        <td>${negotiation.volume}</td>
      `

      const tdEl = document.createElement('td')
      const deleteButton = this.createDeleteButton(negotiation)

      tdEl.appendChild(deleteButton)
      trEl.appendChild(tdEl)
      return trEl
    })
  }

  private createDeleteButton(negotiation: Negotiation): HTMLButtonElement {
    const deleteButtonEl = document.createElement('button')
    deleteButtonEl.textContent = 'Excluir'
    deleteButtonEl.onclick = () => this.handleDeleteNegotiation(negotiation)
    return deleteButtonEl
  }

  private handleDeleteNegotiation(negotiation: Negotiation): void {
    console.log(negotiation)
  }

  private init(): void {
    this.createTable()
  }
}

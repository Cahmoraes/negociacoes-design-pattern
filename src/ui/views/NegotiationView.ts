import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { Negotiation } from '../../domain/Negotiation'
import { DateFormat } from '../../util/DateFormat'
import { INegotiationListAction } from '../../interface/INegotiationListAction'
import { NegotiationList } from '../../domain'
import { View } from '.'

export class NegotiationView
  extends View
  implements IIObserver<INegotiationListAction>
{
  @domInjector('#negociacoes')
  private readonly negotiationsContainer: IElement

  private negotiationList: NegotiationList | null = null

  constructor() {
    super()

    this.init()
  }

  public update({ data }: INegotiationListAction): void {
    this.negotiationList = data
    const tableRows = this.createTableRows(data.negotiations)
    tableRows.push(this.createVolumeTotalTableRow())
    this.print(tableRows)
  }

  private createVolumeTotalTableRow(): HTMLTableRowElement {
    const trEl = document.createElement('tr')
    trEl.innerHTML = /* html */ `
      <td colspan="3"></td>
      <td colspan="2" align="right">Total: ${this.getVolumeTotal()}</td>
    `
    return trEl
  }

  private getVolumeTotal(): number {
    if (!this.negotiationList) return 0

    return this.negotiationList?.negotiations.reduce(
      (total, negotiation) => total + negotiation.volume,
      0,
    )
  }

  protected print(tableRows: HTMLTableRowElement[]): void {
    const oldTbodyEl = this.negotiationsContainer!.querySelector('tbody')
    const newTbodyEl = document.createElement('tbody')

    newTbodyEl.append(...tableRows)
    oldTbodyEl?.replaceWith(newTbodyEl)
  }

  private createTable(): void {
    if (!this.negotiationsContainer) return

    this.negotiationsContainer.innerHTML = /* html */ `
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
    deleteButtonEl.classList.add('btn', 'btn-primary')
    deleteButtonEl.textContent = 'Excluir'
    deleteButtonEl.onclick = () => this.handleDeleteNegotiation(negotiation)
    return deleteButtonEl
  }

  private handleDeleteNegotiation(negotiation: Negotiation): Negotiation {
    this.negotiationList?.delete(negotiation)
    return negotiation
  }

  private init(): void {
    this.createTable()
  }
}

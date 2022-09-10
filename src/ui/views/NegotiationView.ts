import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { NegotiationList } from '../../domain/NegotiationList'
import { Negotiation } from '../../domain/Negotiation'
import { DateFormat } from '../../util/DateFormat'

export class NegotiationView implements IIObserver<NegotiationList> {
  @domInjector('#negociacoes')
  private readonly element: IElement

  private negotiations: Negotiation[] = []
  private table: HTMLTableElement | undefined

  constructor() {
    this.createTable()
  }

  public update(negotiationList: NegotiationList): void {
    this.createRow(this.filterNegotiations(negotiationList.negotiations))
  }

  private createTable() {
    this.table = document.createElement('table')
    this.table.classList.add('table', 'table-hover', 'table-bordered')
    this.table.innerHTML = /* html */ `
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
    `

    this.element?.insertAdjacentElement('beforeend', this.table)
  }

  private filterNegotiations(
    negotiations: readonly Negotiation[],
  ): readonly Negotiation[] {
    const filteredNegotiations = negotiations.filter(
      (newNegotiations) =>
        !this.negotiations.some((negotiation) =>
          negotiation.isEqual(newNegotiations),
        ),
    )

    this.negotiations = [...this.negotiations, ...filteredNegotiations]
    return filteredNegotiations
  }

  private createRow(negotiations: readonly Negotiation[]) {
    const tbodyEl = this.table?.querySelector('tbody')
    const fragmentEl = document.createDocumentFragment()

    for (const negotiation of negotiations) {
      const trEl = document.createElement('tr')

      trEl.onclick = () => {
        console.log(negotiation)
      }

      trEl.innerHTML = /* html */ `
        <td>${DateFormat.format(negotiation.date)}</td>
        <td>${negotiation.quantity}</td>
        <td>${negotiation.amount}</td>
        <td>${negotiation.volume}</td>
      `

      fragmentEl.appendChild(trEl)
    }

    tbodyEl?.appendChild(fragmentEl)
  }

  private template(negotiations: readonly Negotiation[]): string {
    return /* html */ `
      <tr>
        ${negotiations
          .map(
            ({ date, quantity, amount, volume }) => /* html */ `
            <tr>
              <td>${DateFormat.format(date)}</td>
              <td>${quantity}</td>
              <td>${amount}</td>
              <td>${volume}</td>
            </tr>
        `,
          )
          .join('')}
      </tr>
    `
  }

  private handleClick(quantity: number) {
    console.log({ quantity })
  }
}

import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { INegotiationListAction } from '../../interface/INegotiationListAction'
import { NegotiationList } from '../../domain'
import { View } from '.'

export class SummaryView
  extends View
  implements IIObserver<INegotiationListAction>
{
  @domInjector('#sumario')
  private readonly summaryContainer: IElement<HTMLDivElement>

  @domInjector('#sumario tbody')
  private readonly summaryBody: IElement<HTMLTableSectionElement>

  private negotiationList: NegotiationList | null = null

  constructor() {
    super()

    this.init()
  }

  public update({ data }: INegotiationListAction): void {
    this.negotiationList = data
    this.print()
  }

  protected print(): void {
    const table = this.createTableRow()
    this.summaryBody?.replaceChildren(table)
  }

  private createTableRow(): DocumentFragment {
    const fragmentEl = document.createDocumentFragment()
    const trEl = document.createElement('tr')

    this.calculateSummary().forEach((summation) => {
      const td = document.createElement('td')
      td.textContent = summation.toString()
      trEl.appendChild(td)
    })

    fragmentEl.appendChild(trEl)

    return fragmentEl
  }

  private calculateSummary(): number[] {
    return [
      this.getTotalOf('quantity'),
      this.getTotalOf('volume'),
      this.getNegotiationsTotal(),
    ]
  }

  private getNegotiationsTotal(): number {
    return this.negotiationList?.negotiations.length ?? 0
  }

  private getTotalOf(anUnity: 'volume' | 'quantity'): number {
    if (!this.negotiationList) return 0

    return this.negotiationList.negotiations.reduce(
      (total, negotiation) => negotiation[anUnity] + total,
      0,
    )
  }

  private createTable(): void {
    if (!this.summaryContainer) return

    this.summaryContainer.innerHTML = /* html */ `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">QUANTIDADE TOTAL</th>
            <th scope="col">VOLUME TOTAL</th>
            <th scope="col">TOTAL DE NEGOCIAÇÕES</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `
  }

  private init(): void {
    this.createTable()
  }
}

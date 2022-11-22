import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { INegotiationListAction } from '../../interface/INegotiationListAction'
import { NegotiationList } from '../../domain'

export class SummaryView implements IIObserver<INegotiationListAction> {
  @domInjector('#sumario')
  private readonly summaryContainer: IElement

  private negotiationList: NegotiationList | null = null

  constructor() {
    this.init()
  }

  public update({ data }: INegotiationListAction): void {
    this.negotiationList = data
    this.createTableRow()
  }

  private createTableRow() {
    const fragmentEl = document.createDocumentFragment()
    const trEl = document.createElement('tr')

    this.calculateSummary().forEach((summation) => {
      const td = document.createElement('td')
      td.textContent = summation.toString()
      trEl.appendChild(td)
    })

    fragmentEl.appendChild(trEl)
    this.summaryContainer?.querySelector('tbody')?.replaceChildren(fragmentEl)
  }

  private calculateSummary(): number[] {
    return [
      this.getTotalOf('quantity'),
      this.getTotalOf('volume'),
      this.getVolumeTotal(),
    ]
  }

  private getTotalOf(anUnity: 'volume' | 'quantity'): number {
    if (!this.negotiationList) return 0

    return this.negotiationList.negotiations.reduce(
      (total, negotiation) => negotiation[anUnity] + total,
      0,
    )
  }

  private getVolumeTotal(): number {
    if (!this.negotiationList) return 0

    return this.negotiationList?.negotiations.reduce(
      (total, negotiation) => total + negotiation.volume,
      0,
    )
  }

  private createTable(): void {
    this.summaryContainer!.innerHTML = /* html */ `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">QUANTIDADE TOTAL</th>
            <th scope="col">VALOR TOTAL</th>
            <th scope="col">VOLUME TOTAL</th>
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

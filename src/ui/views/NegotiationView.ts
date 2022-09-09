import { domInjector } from '../../util/decorators/domInjector'
import type { IElement } from '../../interface/IElement'
import { IIObserver } from '../../interface/IObserver'
import { NegotiationList } from '../../domain/NegotiationList'
import { Negotiation } from '../../domain/Negotiation'

function dateFormate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
  })
}

export class NegotiationView implements IIObserver<NegotiationList> {
  @domInjector('#negociacoes')
  private readonly element: IElement

  update(negotiationList: NegotiationList): void {
    this.element!.innerHTML = this.template(negotiationList.negotiations)
  }

  private template(negotiations: readonly Negotiation[]): string {
    return /* html */ `
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
          ${negotiations
            .map(
              ({ date, quantity, amount, volume }) => /* html */ `
              <tr>
                <td>${dateFormate(date)}</td>
                <td>${quantity}</td>
                <td>${amount}</td>
                <td>${volume}</td>
              </tr>
          `,
            )
            .join('')}
        </tbody>

        <tfoot></tfoot>
      </table>
    `
  }
}

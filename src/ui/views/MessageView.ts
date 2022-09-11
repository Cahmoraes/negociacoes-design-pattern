import type { IElement } from '../../interface'
import { IIObserver } from '../../interface'
import {
  INegotiationListAction,
  NegotiationAction,
} from '../../interface/INegotiationListAction'
import { domInjector } from '../../util/decorators'

export class MessageView implements IIObserver<INegotiationListAction> {
  @domInjector('#mensagemView')
  private element: IElement<HTMLDivElement>

  public update({ action }: INegotiationListAction): void {
    this.print(action)
  }

  public print(action: NegotiationAction): void {
    this.element!.innerHTML = this.template(action)
  }

  private template(action: NegotiationAction) {
    return action
      ? /* html */ `
    ${templateStrategy(action)}
    `
      : /* html */ `
    <p></p>
    `
  }
}

function templateStrategy(strategy: NegotiationAction) {
  const strategyMap: Record<NegotiationAction, string> = {
    ADD: /* html */ `
      <p class="alert alert-info">Negociação salva com sucesso</p>
    `,
    CLEAR: /* html */ `
      <p class="alert alert-info">Negociações apagadas</p>
    `,
    IMPORT: /* html */ `
      <p class="alert alert-info">Negociações Importadas com sucesso</p>
    `,
  }

  return strategyMap[strategy]
}

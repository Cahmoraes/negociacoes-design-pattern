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

  private timer = 0
  private milliseconds = 2000

  public update({ action }: INegotiationListAction): void {
    this.print(action)
    this.setTimer()
  }

  public print(action: NegotiationAction): void {
    this.element!.innerHTML = this.template(action)
  }

  private setTimer() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.hideMessage()
      this.timer = 0
    }, this.milliseconds)
  }

  private hideMessage() {
    this.element!.innerHTML = /* html */ `<p></p>`
  }

  private template(action: NegotiationAction) {
    return action
      ? /* html */ `
      <p class="alert alert-info">${templateStrategy(action)}</p>
    `
      : /* html */ `<p></p>`
  }
}

const templateStrategy = (function () {
  const strategyMap: Record<NegotiationAction, string> = {
    ADD: 'Negociação salva com sucesso',
    CLEAR: 'Negociações apagadas',
    IMPORT: 'Negociações Importadas com sucesso',
    DELETE: 'Negociação deletada com sucesso',
    LOAD: 'Negociações carregadas com sucesso',
  }

  return (strategy: NegotiationAction) => strategyMap[strategy]
})()

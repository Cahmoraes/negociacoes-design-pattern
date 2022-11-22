import type { IElement } from '../../interface'
import { IIObserver } from '../../interface'
import {
  INegotiationListAction,
  INegotiationAction,
} from '../../interface/INegotiationListAction'
import { eventEmitter } from '../../util'
import { domInjector } from '../../util/decorators'

export class MessageView implements IIObserver<INegotiationListAction> {
  @domInjector('#mensagemView')
  private element: IElement<HTMLDivElement>

  private timer = 0
  private milliseconds = 2000

  constructor() {
    eventEmitter.on('DUPLICATE', (action) => {
      this.showMessage(action)
    })
  }

  public update({ action }: INegotiationListAction): void {
    this.showMessage(action)
  }

  private showMessage(action: INegotiationAction) {
    this.print(action)
    this.setTimer()
  }

  private print(action: INegotiationAction): void {
    if (!this.element) return
    this.element.innerHTML = this.template(action)
  }

  private setTimer(): void {
    if (this.timer) clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.hideMessage()
      this.timer = 0
    }, this.milliseconds)
  }

  private hideMessage(): void {
    if (!this.element) return
    this.element.innerHTML = /* html */ `<p></p>`
  }

  private template(action: INegotiationAction) {
    return action
      ? /* html */ `
      ${templateStrategy(action)}
    `
      : /* html */ `<p></p>`
  }
}

const templateStrategy = (function () {
  const strategyMap: Record<INegotiationAction, string> = {
    ADD: /* html */ ` <p class="alert alert-info">Negociação salva com sucesso</p>`,
    CLEAR: /* html */ ` <p class="alert alert-info">Negociações apagadas</p>`,
    IMPORT: /* html */ `<p class="alert alert-info">Negociações Importadas com sucesso</p>`,
    DELETE: /* html */ `<p class="alert alert-info">Negociação deletada com sucesso</p>`,
    LOAD: /* html */ `<p class="alert alert-info">Negociações carregadas com sucesso</p>`,
    DUPLICATED: /* html */ `<p class="alert alert-warning">Não é possível cadastrar negociação duplicada</p>`,
  }

  return (strategy: INegotiationAction) => strategyMap[strategy]
})()

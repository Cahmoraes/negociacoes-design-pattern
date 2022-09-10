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
    this.element!.innerHTML = this.template(action)
  }

  private template(action: NegotiationAction) {
    return action
      ? /* html */ `
    <p class="alert alert-info">${action}</p>
    `
      : /* html */ `
    <p></p>
    `
  }
}

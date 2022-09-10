import { Negotiation, NegotiationList } from '../domain'
import type { IElement } from '../interface'
import {
  ValidateAmountMiddleware,
  ValidateDateMiddleware,
  ValidateQuantityMiddleware,
} from '../ui/validator'
import { MessageView, NegotiationView } from '../ui/views'
import { domInjector } from '../util/decorators'
import { DateFormat } from '../util'

export class NegotiationController {
  @domInjector('form')
  private form: IElement<HTMLFormElement>

  @domInjector('#data')
  private inputData: IElement<HTMLInputElement>

  @domInjector('#quantidade')
  private inputQuantity: IElement<HTMLInputElement>

  @domInjector('#valor')
  private inputAmount: IElement<HTMLInputElement>

  @domInjector('#botao-apaga')
  private clearButton: IElement<HTMLButtonElement>

  private readonly negotiationsList: NegotiationList
  private readonly negotiationView: NegotiationView
  private readonly messageView: MessageView

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.negotiationView = new NegotiationView()
    this.messageView = new MessageView()
    this.init()
  }

  public add(event: Event): void {
    event.preventDefault()

    try {
      const negotiation = this.create()
      if (this.validate(negotiation)) {
        this.negotiationsList.add(negotiation)
      }
    } catch (error) {
      console.log(error)
    }
  }

  private create(): Negotiation {
    const negotiation = new Negotiation(
      DateFormat.toDate(this.inputData!.value),
      parseInt(this.inputQuantity!.value),
      parseFloat(this.inputAmount!.value),
    )
    return negotiation
  }

  private validate(negotiation: Negotiation): boolean {
    const validator = new ValidateDateMiddleware()

    validator
      .setNext(new ValidateQuantityMiddleware())
      .setNext(new ValidateAmountMiddleware())

    return validator.handle(negotiation)
  }

  private addEvents() {
    this.form?.addEventListener('submit', this.add)

    this.clearButton?.addEventListener('click', this.clearNegotiationList)
  }

  private bindEvent() {
    this.add = this.add.bind(this)
    this.clearNegotiationList = this.clearNegotiationList.bind(this)
  }

  private clearNegotiationList() {
    this.negotiationsList.clear()
  }

  private init() {
    this.bindEvent()
    this.addEvents()
    this.negotiationsList.subscribe(this.negotiationView)
    this.negotiationsList.subscribe(this.messageView)
  }
}

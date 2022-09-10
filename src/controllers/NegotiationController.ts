import { Negotiation, NegotiationList } from '../domain'
import type { IElement } from '../interface'
import {
  ValidateAmountMiddleware,
  ValidateDateMiddleware,
  ValidateQuantityMiddleware,
} from '../ui/validator'
import { NegotiationView } from '../ui/views/NegotiationView'
import { domInjector } from '../util/decorators'
import { DateFormat } from '../util'

export class NegotiationController {
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

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.negotiationView = new NegotiationView()
    this.init()
  }

  public add(): void {
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
    this.clearButton?.addEventListener('click', this.clearNegotiationList)
  }

  private bindEvent() {
    this.clearNegotiationList = this.clearNegotiationList.bind(this)
  }

  private clearNegotiationList() {
    this.negotiationsList.clear()
  }

  private init() {
    this.bindEvent()
    this.addEvents()
    this.negotiationsList.subscribe(this.negotiationView)
  }
}

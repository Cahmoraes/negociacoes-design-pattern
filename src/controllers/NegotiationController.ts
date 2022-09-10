import { Negotiation } from '../domain/Negotiation'
import { NegotiationList } from '../domain/NegotiationList'
import type { IElement } from '../interface/IElement'
import { ValidateAmountMiddleware } from '../ui/validator/ValidateAmountMiddleware'
import { ValidateDateMiddleware } from '../ui/validator/ValidateDateMiddleware'
import { ValidateQuantityMiddleware } from '../ui/validator/ValidateQuantityMiddleware'
import { NegotiationView } from '../ui/views/NegotiationView'
import { domInjector } from '../util/decorators/domInjector'
import { DateFormat } from '../util/DateFormat'

export class NegotiationController {
  @domInjector('#data')
  private inputData: IElement

  @domInjector('#quantidade')
  private inputQuantity: IElement

  @domInjector('#valor')
  private inputAmount: IElement

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

  private init() {
    this.negotiationsList.subscribe(this.negotiationView)
  }
}

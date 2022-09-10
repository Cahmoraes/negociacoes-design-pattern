import { Negotiation, NegotiationList } from '../domain'
import type { IElement } from '../interface'
import {
  ValidateAmountMiddleware,
  ValidateDateMiddleware,
  ValidateQuantityMiddleware,
} from '../ui/validator'
import { MessageView, NegotiationView } from '../ui/views'
import { domInjector } from '../util/decorators'
import { ConnectionFactory, DateFormat } from '../util'
import { NegotiationDao } from '../domain/NegotiationDao'

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
  private connection: IDBDatabase | null
  private negotiationDao: NegotiationDao | null

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.negotiationView = new NegotiationView()
    this.messageView = new MessageView()
    this.connection = null
    this.negotiationDao = null
    this.init()
  }

  public async add(event: Event): Promise<void> {
    event.preventDefault()

    try {
      const negotiation = this.create()
      if (this.validate(negotiation)) {
        await this.negotiationDao?.add(negotiation)
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

  private addEvents(): void {
    this.form?.addEventListener('submit', this.add)

    this.clearButton?.addEventListener('click', this.clearNegotiationList)
  }

  private bindEvent(): void {
    this.add = this.add.bind(this)
    this.clearNegotiationList = this.clearNegotiationList.bind(this)
  }

  private clearNegotiationList(): void {
    this.negotiationsList.clear()
  }

  private async getConnection(): Promise<void> {
    try {
      this.connection = await ConnectionFactory.getConnection()
      this.negotiationDao = new NegotiationDao(this.connection)

      const result = await this.negotiationDao.getAll()
      console.log(result)
      console.log(this.connection)
    } catch (error) {
      console.log(error)
    }
  }

  private init(): void {
    this.bindEvent()
    this.addEvents()
    this.negotiationsList.subscribe(this.negotiationView)
    this.negotiationsList.subscribe(this.messageView)
    this.getConnection()
  }
}

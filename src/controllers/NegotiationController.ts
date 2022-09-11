import { Negotiation, NegotiationList, NegotiationDao } from '../domain'
import type { IElement } from '../interface'
import {
  ValidateAmountMiddleware,
  ValidateDateMiddleware,
  ValidateQuantityMiddleware,
} from '../ui/validator'
import { MessageView, NegotiationView } from '../ui/views'
import { domInjector } from '../util/decorators'
import { DateFormat, DaoFactory, ProxyFactory } from '../util'

export class NegotiationController {
  @domInjector('form')
  private form: IElement<HTMLFormElement>

  @domInjector('#data')
  private inputDate: IElement<HTMLInputElement>

  @domInjector('#quantidade')
  private inputQuantity: IElement<HTMLInputElement>

  @domInjector('#valor')
  private inputAmount: IElement<HTMLInputElement>

  @domInjector('#botao-apaga')
  private clearButton: IElement<HTMLButtonElement>

  private readonly negotiationsList: NegotiationList
  private readonly negotiationView: NegotiationView
  private readonly messageView: MessageView
  private negotiationDao!: NegotiationDao

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.messageView = new MessageView()

    this.negotiationView = ProxyFactory.create(
      new NegotiationView(),
      (negotiation: Negotiation) => this.delete(negotiation),
      'handleDeleteNegotiation',
    )

    this.init()
  }

  public async add(event: Event): Promise<void> {
    event.preventDefault()

    try {
      const negotiation = this.create(
        this.inputDate!.value,
        this.inputQuantity!.value,
        this.inputAmount!.value,
      )
      if (this.validate(negotiation)) {
        await this.negotiationDao?.add(negotiation)
        this.negotiationsList.add(negotiation)
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.reset()
    }
  }

  private create(date: string, quantity: string, amount: string): Negotiation {
    const negotiation = new Negotiation(
      DateFormat.toDate(date),
      parseInt(quantity),
      parseFloat(amount),
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

  private reset(): void {
    this.inputAmount!.value = '0'
    this.inputQuantity!.value = '0.0'
    this.inputDate!.value = ''
  }

  private async init(): Promise<void> {
    this.bindEvent()
    this.addEvents()
    this.negotiationsList.subscribe(this.negotiationView)
    this.negotiationsList.subscribe(this.messageView)

    try {
      this.negotiationDao = await DaoFactory.getNegotiationDao()
      const negotiations = await this.negotiationDao.getAll()

      this.negotiationsList.import(negotiations)
    } catch (error) {
      console.log(error)
    }
  }

  private delete(negotiation: Negotiation): void {
    console.log('Deleting negotiation')
    console.log({ negotiation })
  }
}

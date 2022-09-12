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
import { HttpService } from '../infra/HttpService'
import { NegotiationLoadMapper } from '../util/DataMapper/NegotiationLoadMapper'
import { INegotiationResponse } from '../domain/interfaces'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
console.log(API_ENDPOINT)
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

  @domInjector('#botao-importa')
  private importButton: IElement<HTMLButtonElement>

  private readonly negotiationsList: NegotiationList
  private readonly negotiationView: NegotiationView
  private readonly messageView: MessageView
  private negotiationDao!: NegotiationDao
  private negotiationLoadMapper: NegotiationLoadMapper
  private httpService: HttpService<INegotiationResponse>

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.messageView = new MessageView()
    this.negotiationLoadMapper = new NegotiationLoadMapper()
    this.httpService = new HttpService<INegotiationResponse>(API_ENDPOINT)

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
    this.importButton?.addEventListener('click', this.import)
  }

  private bindEvent(): void {
    this.add = this.add.bind(this)
    this.clearNegotiationList = this.clearNegotiationList.bind(this)
    this.import = this.import.bind(this)
  }

  private async clearNegotiationList(): Promise<void> {
    try {
      this.negotiationsList.clear()
      await this.negotiationDao.clear()
    } catch (error) {
      console.log(error)
    }
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
      if (negotiations.length > 0) this.negotiationsList.import(negotiations)
    } catch (error) {
      console.log(error)
    }
  }

  private async import() {
    try {
      const { NegotiationService } = await import(
        '../domain/NegotiationService'
      )

      const service = new NegotiationService(this.httpService)
      const negotiationsResponse = await service.get()

      const negotiations = this.negotiationLoadMapper
        .setData(negotiationsResponse.negotiations)
        .buildNegotiations()

      console.log({ negotiations })
    } catch (error) {
      console.log(error)
    }
  }

  private async delete(negotiation: Negotiation): Promise<void> {
    console.log('Deleting negotiation')
    console.log({ negotiation })
    try {
      this.negotiationDao.delete(negotiation)
    } catch (error) {
      console.log(error)
    }
  }
}

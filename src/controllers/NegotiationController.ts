import { Negotiation, NegotiationList, NegotiationDao } from '../domain'
import type { IElement } from '../interface'
import {
  ValidateAmountMiddleware,
  ValidateDateMiddleware,
  ValidateQuantityMiddleware,
} from '../ui/validator'
import { MessageView, NegotiationView } from '../ui/views'
import { domInjector } from '../util/decorators'
import {
  DateFormat,
  DaoFactory,
  ProxyFactory,
  NegotiationsLoaderFacade,
} from '../util'
import { HttpService } from '../infra/HttpService'
import { IResponse } from '../domain/interfaces'
import { debounce } from '../util/decorators/debounce'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
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
  private readonly httpService: HttpService<IResponse>
  private negotiationDao!: NegotiationDao

  constructor() {
    this.negotiationsList = new NegotiationList()
    this.messageView = new MessageView()
    this.httpService = new HttpService<IResponse>(API_ENDPOINT)

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
        this.negotiationsList.add(negotiation) &&
          (await this.negotiationDao?.add(negotiation))
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.reset()
    }
  }

  private create(date: string, quantity: string, amount: string): Negotiation {
    const negotiation = new Negotiation(
      DateFormat.stringToDate(date),
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
    this.importButton?.addEventListener('click', this.load)
  }

  private bindEvent(): void {
    this.add = this.add.bind(this)
    this.clearNegotiationList = this.clearNegotiationList.bind(this)
    this.load = this.load.bind(this)
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

  private hasNegotiations(negotiations: Negotiation[]): boolean {
    return negotiations.length > 0
  }

  @debounce(250)
  private async load() {
    try {
      const { NegotiationService } = await import(
        '../domain/NegotiationService'
      )

      const service = new NegotiationService(this.httpService)
      const response = await service.get()

      const negotiations = NegotiationsLoaderFacade.buildNegotiations(
        response.negotiations,
      )

      if (this.hasNegotiations(negotiations)) {
        const negotiationsFiltered =
          this.negotiationsList.getFilteredDuplicateNegotiationsList(
            negotiations,
          )

        negotiationsFiltered.forEach((negotiation) => this.saveDAO(negotiation))

        this.negotiationsList.load(negotiations)
      }
    } catch (error) {
      console.log(error)
    }
  }

  private async saveDAO(negotiation: Negotiation) {
    await this.negotiationDao?.add(negotiation)
  }

  private async delete(negotiation: Negotiation): Promise<void> {
    try {
      this.negotiationDao.delete(negotiation)
    } catch (error) {
      console.log(error)
    }
  }

  private async init(): Promise<void> {
    this.bindEvent()
    this.addEvents()
    this.negotiationsList.subscribe(this.negotiationView)
    this.negotiationsList.subscribe(this.messageView)

    try {
      this.negotiationDao = await DaoFactory.getNegotiationDao()
      ;(await this.negotiationDao.getAll()).map(
        (negotiations) =>
          this.hasNegotiations(negotiations) &&
          this.negotiationsList.import(negotiations),
      )
    } catch (error) {
      console.log(error)
    }
  }
}

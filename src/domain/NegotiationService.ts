import { IHttpService } from '../infra/HttpService/interface'
// import { Maybe } from '../util'
import { Maybe } from '@cahmoraes93/maybe'
import { IResponse } from './interfaces'

/**
 * Define NegotiationService Model
 * @date 04/10/2022 - 16:24:18
 *
 * @export
 * @class NegotiationService
 * @typedef {NegotiationService}
 */
export class NegotiationService {
  /**
   * Creates an instance of NegotiationService.
   * @date 04/10/2022 - 16:24:18
   *
   * @constructor
   * @param {IHttpService<IResponse>} service
   */
  constructor(private readonly service: IHttpService<IResponse>) {}

  /**
   * Get request
   * @date 04/10/2022 - 16:24:18
   *
   * @public
   * @async
   * @returns {Promise<Maybe<IResponse>>}
   */
  public async get(): Promise<Maybe<IResponse>> {
    return Maybe.of(await this.service.get())
    // return Maybe.of(null) as unknown as Promise<Maybe<IResponse>>
  }
}

import { Negotiation } from './Negotiation'
import { NegotiationImportMapper } from '../util/DataMapper'
// import { Maybe } from '../util'
import { Maybe } from '@cahmoraes93/maybe'

export interface IIDBResponse {
  _quantity: number
  _amount: number
  _date: Date
}
export class NegotiationDao {
  private readonly store = 'negotiation'
  private negotiationImportMapper: NegotiationImportMapper

  constructor(private readonly connection: IDBDatabase) {
    this.negotiationImportMapper = new NegotiationImportMapper()
  }

  public async add(negotiation: Negotiation): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.connection.transaction(this.store, 'readwrite')
      const store = transaction.objectStore(this.store)
      const query = store.put(negotiation)

      query.onsuccess = () => {
        resolve()
      }

      query.onerror = (event) => {
        const dbRequest = event.target as IDBRequest
        reject(dbRequest.error)
      }

      // this.closeTransaction(transaction)
    })
  }

  public getAll(): Promise<Maybe<Negotiation[]>> {
    return new Promise<Maybe<Negotiation[]>>((resolve, reject) => {
      const transaction = this.connection.transaction(this.store)
      const cursor = transaction.objectStore(this.store).openCursor()

      const negotiationsResponse: IIDBResponse[] = []

      cursor.onsuccess = (event) => {
        const idbRequest = event.target as IDBRequest
        const cursor = idbRequest.result as IDBCursorWithValue

        if (cursor) {
          const value = cursor.value as IIDBResponse
          negotiationsResponse.push(value)
          cursor.continue()
        } else {
          const negotiations = this.negotiationImportMapper
            .setData(negotiationsResponse)
            .buildNegotiations()

          resolve(Maybe.of(negotiations))
        }
      }

      cursor.onerror = (event) => {
        const idbRequest = event.target as IDBRequest
        reject(idbRequest.error)
      }

      // this.closeTransaction(transaction)
    })
  }

  public delete(negotiationToDelete: Negotiation): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const transaction = this.connection.transaction(this.store, 'readwrite')

      const cursor = transaction.objectStore(this.store).openCursor()

      cursor.onsuccess = (event) => {
        const idbRequest = event.target as IDBRequest
        const cursor = idbRequest.result as IDBCursorWithValue

        if (cursor) {
          const value = cursor.value as IIDBResponse

          const negotiation = new Negotiation(
            value._date,
            value._quantity,
            value._amount,
          )

          if (negotiationToDelete.isEqual(negotiation)) {
            console.log('deletando...')
            cursor.delete()
            resolve()
            return
          }

          cursor.continue()
        }
      }

      cursor.onerror = (event) => {
        const idbRequest = event.target as IDBRequest
        reject(idbRequest.error)
      }
    })
  }

  public clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.connection.transaction(this.store, 'readwrite')
      const store = transaction.objectStore(this.store)

      const request = store.clear()

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        const idbRequest = event.target as IDBRequest
        reject(idbRequest.error)
      }
    })
  }

  // private closeTransaction(transaction: IDBTransaction): void {
  //   transaction.oncomplete = () => this.connection.close()
  // }
}

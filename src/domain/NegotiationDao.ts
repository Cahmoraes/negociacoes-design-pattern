import { Negotiation } from './Negotiation'

export class NegotiationDao {
  private readonly store = 'negotiation'
  constructor(private readonly connection: IDBDatabase) {}

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

      this.closeTransaction(transaction)
    })
  }

  public getAll(): Promise<any[]> {
    return new Promise<Negotiation[]>((resolve, reject) => {
      const transaction = this.connection.transaction(this.store)
      const cursor = transaction.objectStore(this.store).openCursor()

      const negotiations: any[] = []

      cursor.onsuccess = (event) => {
        const idbRequest = event.target as IDBRequest
        const cursor = idbRequest.result as IDBCursorWithValue

        if (cursor) {
          const negotiation = cursor.value
          negotiations.push(negotiation)
          cursor.continue()
        } else {
          resolve(negotiations)
        }
      }

      cursor.onerror = (event) => {
        const idbRequest = event.target as IDBRequest
        reject(idbRequest.error)
      }

      this.closeTransaction(transaction)
    })
  }

  private closeTransaction(transaction: IDBTransaction): void {
    transaction.oncomplete = () => this.connection.close()
  }
}

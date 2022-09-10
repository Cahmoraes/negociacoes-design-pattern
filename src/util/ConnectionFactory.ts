import { CannotInstantiateError } from './errors'

export class ConnectionFactory {
  private static connection: IDBDatabase | null = null
  private static dbName = 'cahmoaes@negotiations'
  private static stores = ['negotiation']
  private static version = 1

  constructor() {
    throw new CannotInstantiateError(ConnectionFactory.constructor.name)
  }

  public static getConnection(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (this.connection) {
        resolve(this.connection)
      }

      const openRequest = indexedDB.open(this.dbName, this.version)

      openRequest.onupgradeneeded = (event: Event) => {
        const dbRequest = event.target as IDBOpenDBRequest
        this.createStores(dbRequest.result)
      }

      openRequest.onsuccess = (event: Event) => {
        const dbRequest = event.target as IDBOpenDBRequest
        this.connection = dbRequest.result

        resolve(this.connection)
      }

      openRequest.onerror = (event: Event) => {
        const dbRequest = event.target as IDBOpenDBRequest
        reject(dbRequest.error?.message)
      }
    })
  }

  private static createStores(connection: IDBDatabase): void {
    this.stores.forEach((store) => {
      if (connection?.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store)
      }

      connection?.createObjectStore(store, { autoIncrement: true })
    })
  }
}

import { NegotiationDao } from '../domain/NegotiationDao'
import { ConnectionFactory } from '.'

export class DaoFactory {
  public static async getNegotiationDao(): Promise<NegotiationDao> {
    try {
      const connection = await ConnectionFactory.getConnection()
      const dao = new NegotiationDao(connection)
      return dao
    } catch (error) {
      console.log(error)
      throw new Error('Não foi possível obter a conexão')
    }
  }
}

import { createServer, Model, Factory } from 'miragejs'

type Negotiation = {
  date: string
  quantity: number
  amount: number
}

const random = () => Math.floor(Math.random() * 100)

export function makeServer() {
  const server = createServer({
    models: {
      negotiation: Model.extend<Negotiation>({} as Negotiation),
    },

    factories: {
      negotiation: Factory.extend({
        date() {
          return `${new Date()}`
        },
        quantity() {
          return random()
        },
        amount() {
          return random()
        },
      }),
    },

    seeds(server) {
      server.createList('negotiation', 10)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 500

      this.get('/negotiations', (schema) => {
        return schema.all('negotiation')
      })
    },
  })

  return server
}

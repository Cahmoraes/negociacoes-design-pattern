export interface INegotiationResponse {
  date: string
  amount: number
  quantity: number
}

export interface IResponse {
  negotiations: INegotiationResponse[]
}

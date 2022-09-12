export interface IResponse {
  date: string
  amount: number
  quantity: number
}

export interface INegotiationResponse {
  negotiations: IResponse[]
}

import { INegotiationAction } from '../interface/INegotiationListAction'

export interface IListener<T> {
  (data: T): void
}

class EventEmitter<T> {
  private listenersMap = new Map<string, IListener<T>[]>()

  public on(topic: string, listener: IListener<T>): void {
    if (!this.listenersMap.has(topic)) {
      this.listenersMap.set(topic, [])
    }
    const topics = this.listenersMap.get(topic)!
    topics.push(listener)
  }

  public emit(topic: string, data: T): void {
    const listeners = this.listenersMap.get(topic)
    if (listeners) listeners.forEach((listener) => listener(data))
  }
}

const eventEmitter = new EventEmitter<INegotiationAction>()
export { eventEmitter }

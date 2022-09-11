interface ITrap<K> {
  (any: K): unknown
}

export class ProxyFactory {
  static create<K>(object: any, trap: ITrap<K>, ...props: string[]) {
    return new Proxy(object, {
      get(target, prop, receiver) {
        if (
          ProxyFactory.isFunction(target, prop) &&
          props.includes(String(prop))
        ) {
          return function (...args: unknown[]) {
            const result = Reflect.apply(target[prop], target, args) as K
            trap(result)
            return result
          }
        }

        return Reflect.get(target, prop, receiver)
      },
    })
  }

  private static isFunction(target: any, prop: PropertyKey) {
    return typeof target[String(prop)] === 'function'
  }
}

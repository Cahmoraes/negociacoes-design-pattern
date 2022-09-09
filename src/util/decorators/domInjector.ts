export function domInjector(selector: string) {
  return function (target: object, propertyKey: PropertyKey) {
    let element: null | HTMLElement = null

    Reflect.defineProperty(target, propertyKey, {
      get() {
        if (!element) element = document.querySelector(selector)
        return element
      },
    })
  }
}

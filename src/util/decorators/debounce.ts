export function debounce(milliseconds = 200) {
  return (
    target: unknown,
    property: PropertyKey,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value
    let timer = 0

    descriptor.value = function (...args: unknown[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        const result = Reflect.apply(originalMethod, this, args)
        return result
      }, milliseconds)
    }

    return descriptor
  }
}

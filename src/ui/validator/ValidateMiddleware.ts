export abstract class ValidateMiddleware<T> {
  private nextHandle: ValidateMiddleware<T> | null = null

  public setNext(nextHandle: ValidateMiddleware<T>): ValidateMiddleware<T> {
    this.nextHandle = nextHandle
    return nextHandle
  }

  abstract handle(data: T): boolean

  protected handleNext(data: T): boolean {
    if (!this.nextHandle) return true
    return this.nextHandle.handle(data)
  }
}

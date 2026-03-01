export function callWithDelay<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
) {
  let block = false
  return function (...args: Parameters<T>) {
    if (!block) {
      callback(...args)
      block = true
      setTimeout(() => (block = false), delay)
    }
  }
}

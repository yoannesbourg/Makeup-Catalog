export function deduplicate<T>(array: T[]): T[] {
  const set = new Set(array)
  return [...set]
}

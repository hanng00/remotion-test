type AsyncTransformFunction<T, U> = (value: T) => Promise<U>;

export async function asyncMap<T, U>(iterable: Iterable<T>, asyncTransform: AsyncTransformFunction<T, U>): Promise<U[]> {
  const promises: Promise<U>[] = [];
  for (const item of iterable) {
    promises.push(asyncTransform(item));
  }
  return Promise.all(promises);
}
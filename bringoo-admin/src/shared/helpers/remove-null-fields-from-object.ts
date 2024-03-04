export function RemoveNullFieldsFromObject<T>(object: T): T {
  const keys: (keyof T)[] = Object.keys(object) as (keyof T)[];
  for (const key of keys) {
    if (object[key] === null) {
      delete object[key];
    }
  }
  return object;
}

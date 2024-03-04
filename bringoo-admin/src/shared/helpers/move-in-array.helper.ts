export function arrayMove<T>(input: T[], from: number, to: number): T[] {
  input = [...input];
  let numberOfDeletedElm: number = 1;

  const elm: T = input.splice(from, numberOfDeletedElm)[0];

  numberOfDeletedElm = 0;

  input.splice(to, numberOfDeletedElm, elm);

  return input;
}

export function arrayGroupMove<T>(input: T[], indexes: Set<number>, toIndex: number): T[] {
  const elements: T[] = input.filter((_: T, index: number) => indexes.has(index));
  let insertAfter: T | undefined;
  let index: number = toIndex;

  if (index !== 0) {
    while (!insertAfter && index > -1) {
      if (!indexes.has(index)) {
        insertAfter = input[index];
      }
      index--;
    }
  }

  for (const element of elements) {
    input.splice(input.indexOf(element), 1);
  }
  input.splice(insertAfter ? input.indexOf(insertAfter) + 1 : 0, 0, ...elements);

  return [...input];
}

export function AlphabeticallySort(code: string, codeNext: string): number {
  if (code === codeNext) {
    return 0;
  }
  return code < codeNext ? -1 : 1;
}

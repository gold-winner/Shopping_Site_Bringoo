export function saveBlobAsFile(data: any, blobType: string, fileName: string): void {
  const a: HTMLAnchorElement = document.createElement('a');
  document.body.append(a);
  const blob: Blob = new Blob([data], { type: blobType });
  const url: string = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

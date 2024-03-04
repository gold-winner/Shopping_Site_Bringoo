export function ImageMiniature(originalSrc: string, minImageSize: number = 50): string {
  if (originalSrc.includes('original', originalSrc.length - 15)) {
    return originalSrc.replace(/^(\S+)\/(\S+)\.(\S+)$/g, `$1/${minImageSize}.$3`);
  }

  return originalSrc;
}
export function ImageOriginal(miniatureSrc: string, minImageSize: number = 50): string {
  if (miniatureSrc.includes(`${minImageSize}`, miniatureSrc.length - 15)) {
    return miniatureSrc.replace(/^(\S+)\/(\S+)\.(\S+)$/g, `$1/original.$3`);
  }
  return miniatureSrc;
}
export function ChangeImageMiniature(miniatureSrc: string, minImageSize: number): string {
  return miniatureSrc.replace(/^(\S+)\/(\S+)\.(\S+)$/g, `$1/${minImageSize}.$3`);
}

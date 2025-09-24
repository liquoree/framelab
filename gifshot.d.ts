declare module 'gifshot' {
  export function createGIF(
    options: any,
    callback: (obj: { error?: string; image?: string }) => void
  ): void
}

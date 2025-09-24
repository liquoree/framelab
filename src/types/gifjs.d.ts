declare module 'gif.js.optimized' {
  interface GIFOptions {
    workers?: number
    quality?: number
    width?: number
    height?: number
    workerScript?: string
  }

  interface FrameOptions {
    delay?: number
    copy?: boolean
  }

  export default class GIF {
    constructor(options?: GIFOptions)
    addFrame(image: any, options?: FrameOptions): void
    on(event: 'finished', cb: (blob: Blob) => void): void
    on(event: 'abort', cb: () => void): void
    on(event: 'progress', cb: (p: number) => void): void
    render(): void
  }
}

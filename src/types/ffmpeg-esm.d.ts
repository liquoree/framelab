declare module '@ffmpeg/ffmpeg/dist/ffmpeg.esm.js' {
  export function createFFmpeg(options?: any): any
  export function fetchFile(path: string | Blob): Promise<Uint8Array>
}

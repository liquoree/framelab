import { useCallback, useState } from 'react'
import { encode } from 'modern-gif'
import workerUrl from 'modern-gif/worker?url'

type Frame = {
  id: string
  index: number
  image: string
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const loadImages = async (frames: Frame[]): Promise<HTMLImageElement[]> => {
  const sortedFrames = [...frames].sort((a, b) => a.index - b.index)
  return Promise.all(
    sortedFrames.map(
      (f) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image()
          img.src = f.image
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve(img)
          img.onerror = reject
        })
    )
  )
}

export const useExporter = (frames: Frame[], fps: number) => {
  const [loading, setLoading] = useState(false)

  const handleExportGif = useCallback(async () => {
    try {
      setLoading(true)
      console.log('▶ Начинаем экспорт GIF...')
      const images = await loadImages(frames)
      console.log(`Загружено кадров: ${images.length}`)

      if (images.length === 0) {
        console.warn('⚠ Нет кадров для экспорта GIF')
        alert('Невозможно экспортировать: в анимации нет кадров')
        return
      }

      const { width, height } = images[0]
      const delay = Math.round(1000 / fps)

      const gifFrames = images.map((img, i) => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!

        // сначала белый фон
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // потом сам кадр
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, img.width, img.height)
        console.log(`✔ Кадр ${i} готов (${img.width}x${img.height})`)

        return { data: imageData.data as any, delay }
      })

      console.log(`▶ Кодируем GIF с FPS=${fps} (delay=${delay}мс)...`)
      const output = await encode({
        workerUrl,
        width,
        height,
        frames: gifFrames,
        format: 'arrayBuffer',
      })

      console.log(
        '✔ GIF закодирован. Размер:',
        (output as ArrayBuffer).byteLength,
        'байт'
      )

      const blob = new Blob([output], { type: 'image/gif' })
      downloadBlob(blob, 'animation.gif')
      console.log('✔ GIF сохранён как animation.gif')
    } catch (error) {
      console.error('❌ Ошибка экспорта GIF:', error)
    } finally {
      setLoading(false)
    }
  }, [frames, fps])

  return { handleExportGif, loading }
}

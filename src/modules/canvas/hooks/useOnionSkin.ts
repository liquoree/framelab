import { useEffect, useMemo, useRef } from 'react';
import { useFrames } from '../../frames';

export const useOnionSkin = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const onionRef = useRef<HTMLCanvasElement | null>(null);
  const { frames, selectedFrame } = useFrames();

  const prevImage = useMemo(() => {
    if (selectedFrame <= 1) return null;
    const prevFrame = frames.find((f) => f.index === selectedFrame - 1);
    return prevFrame?.image || null;
  }, [frames, selectedFrame]);

  useEffect(() => {
    const canvas = onionRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, [containerRef]);

  useEffect(() => {
    const canvas = onionRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!prevImage) return;

    const img = new Image();
    img.src = prevImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [prevImage]);

  return { onionRef };
};
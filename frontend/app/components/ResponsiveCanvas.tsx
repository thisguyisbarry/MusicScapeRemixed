// ResponsiveCanvas.tsx
import React, { useRef, useEffect } from 'react';

interface ResponsiveCanvasProps {
  aspectRatio?: number;
  draw: (canvas: HTMLCanvasElement) => void;  // Required draw function
}

function ResponsiveCanvas({ aspectRatio = 16 / 9, draw }: ResponsiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = width / aspectRatio;

        canvas.width = width;
        canvas.height = height;
        draw(canvas);  // Call the draw function with the resized canvas
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [draw]);

  return <canvas ref={canvasRef} className="responsive-canvas" />;
}

export default ResponsiveCanvas;
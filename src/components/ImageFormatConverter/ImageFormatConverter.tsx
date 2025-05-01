import React, { useEffect, useRef, useState } from 'react';

type FormatConverterProps = {
  src: string;
  format?: 'image/png' | 'image/jpeg' | 'image/webp';
  quality?: number;
  alt?: string;
  width?: number;
  height?: number;
};

const ImageFormatConverter: React.FC<FormatConverterProps> = ({
  src,
  format = 'image/png',
  quality = 0.92,
  alt = 'Converted Image',
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [convertedSrc, setConvertedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const newDataUrl = canvas.toDataURL(format, quality);
          setConvertedSrc(newDataUrl);
        }
      }
    };
  }, [src, format, quality, width, height]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {convertedSrc && (
        <>
          <h4>Preview - Format: {format}</h4>
          <img src={convertedSrc} alt={alt} width={width} height={height} style={{ border: '1px solid #ccc' }} />
        </>
      )}
    </div>
  );
};

export default ImageFormatConverter;

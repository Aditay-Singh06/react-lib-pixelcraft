import React, { useEffect, useRef } from 'react';

type Position = 
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'custom';

interface WatermarkedImageProps {
  baseImageUrl: string;
  watermarkText?: string;
  watermarkImageUrl?: string;
  position?: Position;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  opacity?: number;
  font?: string;
  textColor?: string;
  watermarkWidth?: number;
  watermarkHeight?: number;
}

const WatermarkedImage: React.FC<WatermarkedImageProps> = ({
  baseImageUrl,
  watermarkText,
  watermarkImageUrl,
  position = 'bottom-right',
  top,
  left,
  bottom,
  right,
  opacity = 0.5,
  font = '24px Arial',
  textColor = 'rgba(255, 255, 255, 0.7)',
  watermarkWidth = 100,
  watermarkHeight = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const baseImage = new Image();
    baseImage.crossOrigin = 'anonymous';
    baseImage.src = baseImageUrl;

    baseImage.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = baseImage.width;
      canvas.height = baseImage.height;

      ctx.drawImage(baseImage, 0, 0);

      const applyWatermark = () => {
        ctx.globalAlpha = opacity;

        let x = 0, y = 0;

        const calculatePosition = () => {
          switch (position) {
            case 'top-left':
              x = 10;
              y = 10;
              break;
            case 'top-right':
              x = baseImage.width - (watermarkWidth + 10);
              y = 10;
              break;
            case 'bottom-left':
              x = 10;
              y = baseImage.height - (watermarkHeight + 10);
              break;
            case 'bottom-right':
              x = baseImage.width - (watermarkWidth + 10);
              y = baseImage.height - (watermarkHeight + 10);
              break;
            case 'center':
              x = (baseImage.width - watermarkWidth) / 2;
              y = (baseImage.height - watermarkHeight) / 2;
              break;
            case 'custom':
              x = left ?? baseImage.width - (right ?? watermarkWidth + 10) - watermarkWidth;
              y = top ?? baseImage.height - (bottom ?? watermarkHeight + 10) - watermarkHeight;
              break;
            default:
              x = 10;
              y = 10;
          }
        };

        calculatePosition();

        if (watermarkText) {
          ctx.font = font;
          ctx.fillStyle = textColor;
          ctx.fillText(watermarkText, x, y + watermarkHeight);
        } else if (watermarkImageUrl) {
          const watermarkImage = new Image();
          watermarkImage.crossOrigin = 'anonymous';
          watermarkImage.src = watermarkImageUrl;
          watermarkImage.onload = () => {
            ctx.drawImage(watermarkImage, x, y, watermarkWidth, watermarkHeight);
          };
        }

        ctx.globalAlpha = 1.0;
      };

      applyWatermark();
    };
  }, [
    baseImageUrl,
    watermarkText,
    watermarkImageUrl,
    position,
    top,
    left,
    bottom,
    right,
    opacity,
    font,
    textColor,
    watermarkWidth,
    watermarkHeight,
  ]);

  return <canvas ref={canvasRef} />;
};

export default WatermarkedImage;

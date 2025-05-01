import React from 'react';

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageEditorProps {
  src: string;
  rotate?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  colorOverlay?: string; // HEX with alpha, e.g., "#00000055"
  crop?: Crop;
  width?: number;
  height?: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  src,
  rotate = 0,
  flipHorizontal = false,
  flipVertical = false,
  colorOverlay,
  crop = { x: 0, y: 0, width: 300, height: 300 },
  width = 300,
  height = 300,
}) => {
  const transform = `
    rotate(${rotate}deg)
    scaleX(${flipHorizontal ? -1 : 1})
    scaleY(${flipVertical ? -1 : 1})
  `;

  const imageType = src.split('.').pop()?.toUpperCase() || 'Unknown';

  return (
    <div
      style={{
        width: crop.width,
        height: crop.height,
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #ddd',
        display: 'inline-block',
      }}
    >
      <div
        style={{
          transform,
          position: 'absolute',
          top: -crop.y,
          left: -crop.x,
        }}
      >
        <img
          src={src}
          alt="Edited"
          width={width}
          height={height}
          style={{ display: 'block' }}
        />
      </div>

      {colorOverlay && (
        <div
          style={{
            backgroundColor: colorOverlay,
            position: 'absolute',
            top: 0,
            left: 0,
            width: crop.width,
            height: crop.height,
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          fontSize: 12,
          padding: '2px 6px',
          borderRadius: 4,
        }}
      >
        {imageType} Format
      </div>
    </div>
  );
};

export default ImageEditor;

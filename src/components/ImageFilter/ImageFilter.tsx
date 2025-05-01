import React from 'react';

type FilterProps = {
  src: string;
  alt?: string;
  grayscale?: number;   // 0 to 1
  sepia?: number;       // 0 to 1
  brightness?: number;  // 0.5 to 2
  contrast?: number;    // 0.5 to 2
  blur?: number;        // in px
  width?: string;
  height?: string;
};

const ImageFilter: React.FC<FilterProps> = ({
  src,
  alt = 'Filtered Image',
  grayscale = 0,
  sepia = 0,
  brightness = 1,
  contrast = 1,
  blur = 0,
  width = '300px',
  height = 'auto',
}) => {
  const filterStyle = `
    grayscale(${grayscale})
    sepia(${sepia})
    brightness(${brightness})
    contrast(${contrast})
    blur(${blur}px)
  `;

  return (
    <img
      src={src}
      alt={alt}
      style={{
        filter: filterStyle,
        width,
        height,
        borderRadius: '8px',
      }}
    />
  );
};

export default ImageFilter;

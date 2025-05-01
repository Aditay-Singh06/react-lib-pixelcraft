import React, { useEffect, useState } from 'react';

type Unit = 'KB' | 'MB';

interface ImageCompressorProps {
  imageUrl?: string;       // External image URL
  imagePath?: string;      // Local/public path to image
  targetSize: number;      // Target size value
  unit?: Unit;             // KB or MB
  onCompressed?: (compressedDataUrl: string, blob: Blob) => void;
}

const ImageCompressor: React.FC<ImageCompressorProps> = ({
  imageUrl,
  imagePath,
  targetSize,
  unit = 'KB',
  onCompressed,
}) => {
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  useEffect(() => {
    const finalImageSource = imageUrl || imagePath;
    if (!finalImageSource) return;

    const compressImage = async () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = finalImageSource;

      const targetBytes = unit === 'MB' ? targetSize * 1024 * 1024 : targetSize * 1024;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.92;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        let blob = dataURLToBlob(dataUrl);

        const compressLoop = () => {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
          blob = dataURLToBlob(dataUrl);

          if (blob.size <= targetBytes || quality <= 0.1) {
            setCompressedUrl(dataUrl);
            onCompressed?.(dataUrl, blob);
            return;
          }

          quality -= 0.05;
          compressLoop();
        };

        compressLoop();
      };

      img.onerror = () => {
        console.error('Failed to load image.');
      };
    };

    compressImage();
  }, [imageUrl, imagePath, targetSize, unit, onCompressed]);

  const dataURLToBlob = (dataUrl: string): Blob => {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      {compressedUrl ? (
        <div>
          <p>Compressed Image:</p>
          <img src={compressedUrl} alt="Compressed" style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <p>Compressing image...</p>
      )}
    </div>
  );
};

export default ImageCompressor;

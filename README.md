# 📦 Pixel Craft

**Pixel Craft** is a simple and powerful React-based image utility library that provides essential image manipulation features, including:

- ✅ Add Watermark (text/image)
- 📉 Compress Image
- 🎨 Apply Filters (grayscale, sepia, blur, etc.)
- 🔁 Format Conversion (PNG, JPEG, WebP, etc.)
- ✂️ Crop Image

---

## 🚀 Installation

```bash
npm install pixel-craft


```
## 🛠 Features

- Add Watermark – Overlay text or image watermarks with custom positioning.
- Compress Image – Reduce image file size while retaining visual quality.
- Apply Filters – Apply common image filters easily.
- Format Conversion – Convert image formats (PNG, JPEG, WebP, etc.)- Crop Image – Crop images with specified dimensions and coordinates.

## ⚙️ Usage
```
import {
  WatermarkedImage,
  ImageCompressor,
  ImageFilter,
  ImageFormatConverter,
  ImageEditor,
} from 'pixel-craft';
```


## ➕ Add Watermark

```
<WatermarkedImage
  baseImageUrl="https://example.com"
  watermarkText="watermark text"
  position="top-left"
  font="bold 20px Arial"
  textColor="rgba(255, 0, 0, 0.6)"
  opacity={0.7}
/>
```

## 📉 Compress image
```
 <ImageCompressor
    imageUrl="https://example.com"
    targetSize={300}
    unit="KB"
  />
```

## 🎨 Apply Filter
```
 <ImageFilter
        src="/assets/image.jpg"
        grayscale={0.5}
        sepia={0.9}
        brightness={1.2}
        contrast={1.1}
        blur={0}
        width="350px"
      />
```

## 🔁 Convert Format
```
<ImageFormatConverter
        src="/assets/image.jpg"
        format="image/webp"
        quality={0.8}
        width={400}
        height={300}
      /> // 'png', 'jpeg', 'jpg'
```

## ✂️ Crop image
```
<ImageEditor
        src="/assets/image.jpg"
        rotate={0}
        flipHorizontal={false}
        flipVertical={false}
        colorOverlay="#00ff0055"
        crop={{ x: 50, y: 20, width: 300, height: 200 }}
        width={500}
        height={300}
      />
```
## Demo

Coming Soon..

## 📚 Documentation
Full documentation and API reference will be available on [![Documentation website]](https://pixcel-craft-git-main-suyashsingh0504-gmailcoms-projects.vercel.app/)


## 🧑‍💻 Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

- Fork the repo
- Create a new branch (git checkout -b feature/my-feature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin feature/my-feature)
- Create a new Pull Request

## Compatibility
- React 17+
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Not intended for Node.js backend usage

## Supported Formats
- Input: PNG, JPEG, JPG, WebP
- Output: PNG, JPEG, JPG, WebP

## 📜 License

MIT © [Aditya Singh]


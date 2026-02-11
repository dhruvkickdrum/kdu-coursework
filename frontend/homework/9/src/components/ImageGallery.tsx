import { useCallback, useEffect, useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

// Image component => Show in the product details page with all images(thumbnail)
export default function ImageGallery({ images, title }: Readonly<ImageGalleryProps>) {
  const [selected, setSelected] = useState(images[0] ?? '')

  useEffect(() => {
    setSelected(images[0] ?? '')
  }, [images])

  const handleSelect = useCallback((image: string) => setSelected(image), [])

  if (!images.length) {
    return null
  }

  return (
    <div className="gallery">
      <div className="gallery_main">
        <img src={selected} alt={title} />
      </div>
      {images.length > 1 && (
        <div className="gallery_thumbs">
          {images.map((image) => (
            <button
              key={image}
              type="button"
              className={`gallery_thumb ${image === selected ? 'is-active' : ''}`}
              onClick={() => handleSelect(image)}
            >
              <img src={image} alt={`${title} thumbnail`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

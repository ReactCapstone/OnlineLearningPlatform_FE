import { useState } from 'react'

function isImageSource(value?: string | null): boolean {
  if (!value) return false
  const v = value.trim()
  return (
    v.startsWith('data:image') ||
    v.startsWith('http://') ||
    v.startsWith('https://') ||
    v.startsWith('blob:')
  )
}

interface CourseThumbnailProps {
  src?: string | null
  alt?: string
  className?: string
  imageClassName?: string
  fallback?: string
}

export default function CourseThumbnail({
  src,
  alt = '',
  className = '',
  imageClassName = 'h-full w-full object-cover',
  fallback = '📘',
}: CourseThumbnailProps) {
  const [failed, setFailed] = useState(false)
  const value = src?.trim() || fallback

  if (!failed && isImageSource(value)) {
    return (
      <div className={className}>
        <img
          src={value}
          alt={alt}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center text-3xl ${className}`}>
      {isImageSource(value) ? fallback : value}
    </div>
  )
}

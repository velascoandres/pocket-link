import React, { type SyntheticEvent, useEffect,useState } from 'react'
import Image from 'next/image'


interface Props extends React.ImgHTMLAttributes<HTMLImageElement>{
    fallback: string
    alt: string
    src: string
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
}


export const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: Props) => {
  const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event> | null>(null)
  
  useEffect(() => {
    setError(null)
  }, [src])
  
  return (
    <Image
      alt={alt}
      onError={(evt) => setError(evt)}
      src={error ? fallback : src}
      {...props}
    />
  )
}
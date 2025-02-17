import { FC, useEffect, useState } from 'react'
import * as imagesComp from './assets'
import styles from './SimpleLoader.module.scss'

type simpleLoaderT = {
  style?: { [key: string]: string | number }
  loaderColor?: string
}

export type newLoaderT = {
  style?: { [key: string]: string | number }
}

const images = [
  imagesComp.image1,
  imagesComp.image2,
  imagesComp.image3,
  imagesComp.image4,
  imagesComp.image5,
  imagesComp.image6,
  imagesComp.image7,
  imagesComp.image8,
  imagesComp.image9,
]

export const SimpleLoader: FC<simpleLoaderT> = ({ style, loaderColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, margin: 'auto', background: 'transparent', display: 'block', shapeRendering: 'auto' }}
      width="240px"
      height="240px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={loaderColor || '#357EEB'}
        strokeWidth="7"
        r="40"
        strokeDasharray="141.37166941154067 49.12388980384689"
      >
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.25s" values="0 50 50;360 50 50" keyTimes="0;1" />
      </circle>
    </svg>
  )
}

export const NewLoader: FC<newLoaderT> = ({ style }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 200) // Меняем изображение каждые 3 секунды

    return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
  }, [])

  return (
    <div className={styles.loader} style={{ ...style }}>
      <img src={imagesComp.logoLoader} style={{ height: '106px', width: '176px' }} alt="loader-logo" />
      <div className={styles.slider_container}>
        {images.map((image, index) => (
          <img
            decoding="async"
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

import { FC } from 'react'

type simpleLoaderT = {
  style?: { [key: string]: string | number }
  loaderColor?: string
}

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
        stroke={loaderColor || '#ba75ff'}
        strokeWidth="7"
        r="40"
        strokeDasharray="141.37166941154067 49.12388980384689"
      >
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.25s" values="0 50 50;360 50 50" keyTimes="0;1" />
      </circle>
    </svg>
  )
}

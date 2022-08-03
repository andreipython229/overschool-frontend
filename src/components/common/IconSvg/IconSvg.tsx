import React, { FC } from 'react'

type IconSvgT = {
  width: number
  height: number
  fill: string
  d: string
  viewBoxSize?: string
}

export const IconSvg: FC<IconSvgT> = ({ width, height, fill, d, viewBoxSize = ' 0 0 20 20' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBoxSize}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={d} fill={fill} />
    </svg>
  )
}

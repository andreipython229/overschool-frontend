import React, { FC, memo } from 'react'

type IconSvgT = {
  width: number
  height: number
  fill?: string
  d: string
  d2?: string
  viewBoxSize?: string
  className?: string
  fillRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined
  clipRule?: 'nonzero' | 'evenodd' | 'inherit' | undefined
  functionOnClick?: (params: any | undefined) => void
}

export const IconSvg: FC<IconSvgT> = memo(
  ({
    width,
    height,
    fill,
    d,
    d2,
    viewBoxSize = ' 0 0 20 20',
    className,
    functionOnClick,
    fillRule,
    clipRule,
  }) => {
    return (
      <svg
        className={className}
        onClick={functionOnClick}
        width={width}
        height={height}
        viewBox={viewBoxSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} fill={fill} />
        d2 &&{' '}
        <path fillRule={fillRule && fillRule} clipRule={clipRule && clipRule} d={d2} fill={fill} />
      </svg>
    )
  },
)

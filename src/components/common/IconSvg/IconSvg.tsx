import React, { FC, memo } from 'react'

type IconSvgT = {
  width: number
  height: number
  fill?: string
  d: string
  d2?: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square' | undefined
  strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel' | undefined
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
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
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
        <path
          d={d}
          fill={fill}
          stroke={stroke && stroke}
          strokeWidth={strokeWidth && strokeWidth}
          strokeLinecap={strokeLinecap && strokeLinecap}
          strokeLinejoin={strokeLinejoin && strokeLinejoin}
        />
        d2 &&
        <path fillRule={fillRule && fillRule} clipRule={clipRule && clipRule} d={d2} fill={fill} />
      </svg>
    )
  },
)

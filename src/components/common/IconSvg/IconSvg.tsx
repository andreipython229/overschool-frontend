import { FC, memo, PointerEvent, ReactNode } from 'react'

export type pathT = {
  fill?: string
  d: string
  stroke?: string
  strokeWidth?: string
  strokeLinecap?: 'inherit' | 'round' | 'butt' | 'square'
  strokeLinejoin?: 'inherit' | 'round' | 'miter' | 'bevel'
  fillRule?: 'nonzero' | 'evenodd' | 'inherit'
  clipRule?: 'nonzero' | 'evenodd' | 'inherit'
}

export type IconSvgT = {
  styles?: { [key: string]: string | number }
  width: number
  height: number
  viewBoxSize?: string
  className?: string
  path?: pathT[]
  children?: ReactNode
  functionOnClick?: <T>(params: T) => void
  onPointerDown?: (event: PointerEvent<SVGSVGElement | SVGPathElement>) => void
}

export const IconSvg: FC<IconSvgT> = memo(
  ({ styles, width, height, path, viewBoxSize = ' 0 0 20 20', className, functionOnClick, children, onPointerDown }) => {
    return (
      <svg
        style={styles}
        className={className}
        onClick={functionOnClick}
        onPointerDown={onPointerDown}
        width={width}
        height={height}
        viewBox={viewBoxSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {path &&
          path.map((path, id) => {
            const { d, fill, stroke, strokeWidth, strokeLinecap, strokeLinejoin, fillRule, clipRule } = path
            return (
              <path
                key={id}
                d={d}
                fill={fill}
                stroke={stroke && stroke}
                strokeWidth={strokeWidth && strokeWidth}
                strokeLinecap={strokeLinecap && strokeLinecap}
                strokeLinejoin={strokeLinejoin && strokeLinejoin}
                fillRule={fillRule && fillRule}
                clipRule={clipRule && clipRule}
              />
            )
          })}
        {children}
      </svg>
    )
  },
)

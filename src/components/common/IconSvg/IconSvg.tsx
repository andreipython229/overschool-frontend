import { FC, memo } from 'react'
import { IconSvgT } from '../commonComponentsTypes'

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

/*import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Chart = ({ data, width, height }) => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const getX = d3.scaleBand()
    .domain(data.map((item: { name: any; }) => item.name))
    .range([0, width]);

  const getY = d3.scaleLinear()
    .domain([0, 40])
    .range([height, 0]);

  const getYAxis = (ref: any) => {
    const yAxis = d3.axisLeft(getY)
      .tickSize(-width)
      .tickPadding(7);
    d3.select(ref).call(yAxis);
  };

  const getXAxis = ref => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const linePath = d3.line()
    .x(d => getX(d.name) + getX.bandwidth() / 2)
    .y(d => getY(d.values))
    .curve(d3.curveMonotoneX)(data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const areaPath = d3.area()
    .x(d => getX(d.name) + getX.bandwidth() / 2)
    .y0(d => getY(d.values))
    .y1(() => getY(0))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e: { nativeEvent: { offsetX: any; }; }) => {
    const x = e.nativeEvent.offsetX;
    const index = Math.floor(x / getX.step());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <div className="wrapper">
      <svg
        className="svg"
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className="axis" ref={getYAxis} />
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0,${getY(0)})`}
        />
        <path
          fill="#7cb5ec"
          d={areaPath}
          opacity={0.2}
        />
        <path
          strokeWidth={3}
          fill="none"
          stroke="#7cb5ec"
          d={linePath}
        />
        {data.map((item: { name: string; value: string | boolean | d3.NumberValue | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }, index: React.Key | null | undefined) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return (
            <g key={index}>
              <circle
                cx={getX(item.name) + getX.bandwidth() / 2}
                cy={getY(item.value)}
                r={index === activeIndex ? 6 : 4}
                fill="#7cb5ec"
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: `ease-out .1s` }}
              />
              <text
                fill="#666"
                x={getX(item.name) + getX.bandwidth() / 2}
                y={getY(item.value) - 10}
                textAnchor="middle"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
*/

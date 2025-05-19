import React from "react";

export const Back = ({
  bgColor = "#CFE2FF",
  arrowColor = "#332F36",
  width = 44,
  height = 44,
  borderRadius = 14,
  className = "",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`back-button ${className}`}
    {...props}
  >
    <rect
      width={width}
      height={height}
      rx={borderRadius}
      fill={bgColor}
    />
    <path
      d="M26.2636 9.13464C26.5565 9.13464 26.8495 9.24255 27.0807 9.4738C27.5278 9.92089 27.5278 10.6609 27.0807 11.108L17.029 21.1596C16.289 21.8996 16.289 23.1021 17.029 23.8421L27.0807 33.8938C27.5278 34.3409 27.5278 35.0809 27.0807 35.528C26.6336 35.9751 25.8936 35.9751 25.4465 35.528L15.3949 25.4763C14.6086 24.6901 14.1615 23.6263 14.1615 22.5009C14.1615 21.3755 14.5932 20.3117 15.3949 19.5255L25.4465 9.4738C25.6778 9.25797 25.9707 9.13464 26.2636 9.13464Z"
      fill={arrowColor}
    />
  </svg>
);
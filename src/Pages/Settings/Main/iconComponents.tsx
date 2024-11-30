
export const InstagramIcon = ({ size = 28, color = '#332F36' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="clipPath">
        <rect
          width="31"
          height="31"
          transform="translate(0.5 0.5)"
          fill="white"
          fillOpacity="0"
        />
      </clipPath>
    </defs>
    <rect
      width="31"
      height="31"
      transform="translate(0.5 0.5)"
      fill="none"
    />
    <g clipPath="url(#clipPath)">
      <mask
        id="iconMask"
        maskUnits="userSpaceOnUse"
        x="4"
        y="4"
        width="24"
        height="24"
      >
        <path
          d="M9.33 4C7.91 4 6.56 4.56 5.56 5.56C4.56 6.56 4 7.91 4 9.33V22.66C4 24.08 4.56 25.43 5.56 26.43C6.56 27.43 7.91 28 9.33 28H22.66C24.08 28 25.43 27.43 26.43 26.43C27.43 25.43 28 24.08 28 22.66V9.33C28 7.91 27.43 6.56 26.43 5.56C25.43 4.56 24.08 4 22.66 4H9.33Z"
          stroke="white"
          strokeWidth="2.67"
          strokeLinejoin="round"
        />
        <path
          d="M19.77 19.76C20.77 18.76 21.33 17.41 21.33 15.99C21.33 14.58 20.77 13.22 19.77 12.22C18.77 11.22 17.41 10.66 15.99 10.66C14.58 10.66 13.22 11.22 12.22 12.22C11.22 13.22 10.66 14.58 10.66 15.99C10.66 17.41 11.22 18.76 12.22 19.76C13.22 20.76 14.58 21.33 15.99 21.33C17.41 21.33 18.77 20.76 19.77 19.76Z"
          stroke="white"
          strokeWidth="2.67"
          strokeLinejoin="round"
        />
        <path
          d="M23.33 10C23.68 10 24.02 9.86 24.27 9.61C24.52 9.36 24.66 9.02 24.66 8.66C24.66 8.31 24.52 7.97 24.27 7.72C24.02 7.47 23.68 7.33 23.33 7.33C22.97 7.33 22.64 7.47 22.39 7.72C22.14 7.97 22 8.31 22 8.66C22 9.02 22.14 9.36 22.39 9.61C22.64 9.86 22.97 10 23.33 10Z"
          fill="white"
        />
      </mask>
      <g mask="url(#iconMask)">
        <rect width="32" height="32" fill={color} />
      </g>
    </g>
  </svg>
);
export const PenIcon = ({ width = 28, height = 28 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip4697_12867">
          <rect
            id="Property 1=pen"
            rx="-0.5"
            width="23"
            height="23"
            transform="translate(0.5 0.5)"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="Property 1=pen"
        rx="-0.5"
        width="23"
        height="23"
        transform="translate(0.5 0.5)"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <g clipPath="url(#clip4697_12867)">
        <rect
          id="edit-2"
          rx="-0.5"
          width="23"
          height="23"
          transform="translate(0.5 0.5)"
          fill="#FFFFFF"
          fillOpacity="0"
        />
        <path
          d="M5.53 19.51C4.92 19.51 4.35 19.3 3.94 18.91C3.42 18.42 3.17 17.68 3.26 16.88L3.64 13.65C3.71 13.03 4.08 12.23 4.5 11.78L12.72 3.09C14.76 0.92 16.91 0.86 19.08 2.91C21.25 4.96 21.31 7.1 19.25 9.27L11.05 17.96C10.63 18.41 9.84 18.83 9.24 18.93L6.01 19.49C5.84 19.5 5.69 19.51 5.53 19.51ZM15.92 2.91C15.16 2.91 14.49 3.38 13.81 4.1L5.59 12.8C5.4 13.01 5.16 13.51 5.13 13.8L4.75 17.04C4.72 17.37 4.8 17.65 4.98 17.82C5.16 17.99 5.42 18.04 5.75 18L8.98 17.44C9.26 17.4 9.75 17.13 9.94 16.92L18.16 8.24C19.4 6.91 19.84 5.69 18.03 4C17.24 3.23 16.55 2.91 15.92 2.91Z"
          fill="#292D32"
          fillOpacity="1"
          fillRule="nonzero"
        />
        <path
          d="M17.33 10.95C17.32 10.95 17.29 10.95 17.26 10.95C14.15 10.64 11.64 8.27 11.16 5.16C11.09 4.76 11.38 4.38 11.79 4.31C12.2 4.25 12.58 4.53 12.65 4.94C13.03 7.36 14.99 9.22 17.42 9.46C17.83 9.5 18.14 9.87 18.09 10.28C18.05 10.66 17.72 10.95 17.33 10.95Z"
          fill="#292D32"
          fillOpacity="1"
          fillRule="nonzero"
        />
        <path
          d="M21 22.75L3 22.75C2.58 22.75 2.25 22.41 2.25 22C2.25 21.58 2.58 21.25 3 21.25L21 21.25C21.41 21.25 21.75 21.58 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
          fill="#292D32"
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

export const YoutubeIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clipPathCustomIcon">
          <rect
            width="31"
            height="31"
            transform="translate(0.5 0.5)"
            fill="white"
          />
        </clipPath>
      </defs>

      <rect
        width="31"
        height="31"
        transform="translate(0.5 0.5)"
        fill="#FFFFFF"
        fillOpacity="0"
      />

      <g clipPath="url(#clipPathCustomIcon)">
        <path
          d="M30.33 9.13C30.16 8.52 29.83 7.97 29.36 7.53C28.89 7.08 28.31 6.76 27.68 6.6C25.35 6 15.98 6 15.98 6C15.98 6 6.61 6.01 4.28 6.62C3.65 6.78 3.07 7.1 2.6 7.55C2.13 7.99 1.8 8.54 1.63 9.14C0.92 13.08 0.65 19.08 1.65 22.86C1.82 23.47 2.15 24.02 2.62 24.46C3.09 24.91 3.66 25.23 4.3 25.39C6.63 26 16 26 16 26C16 26 25.37 26 27.7 25.39C28.33 25.23 28.91 24.91 29.38 24.46C29.84 24.02 30.18 23.47 30.35 22.86C31.09 18.92 31.32 12.92 30.33 9.13Z"
          fill="#332F36"
          fillRule="evenodd"
        />
        <path
          d="M13 19L19 16L13 13L13 19Z"
          fill="#FFFFFF"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};
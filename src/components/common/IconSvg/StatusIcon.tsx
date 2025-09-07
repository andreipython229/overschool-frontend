import React from 'react'

interface IconProps {
  className?: string
}

const StatusIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.87891 18.9001C6.46891 18.9001 6.12891 18.5601 6.12891 18.1501V16.0801C6.12891 15.6701 6.46891 15.3301 6.87891 15.3301C7.28891 15.3301 7.62891 15.6701 7.62891 16.0801V18.1501C7.62891 18.5701 7.28891 18.9001 6.87891 18.9001Z"
        fill="url(#paint0_linear_30854_16253)"
      />
      <path
        d="M12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15C12.75 18.57 12.41 18.9 12 18.9Z"
        fill="url(#paint1_linear_30854_16253)"
      />
      <path
        d="M17.1211 18.8997C16.7111 18.8997 16.3711 18.5597 16.3711 18.1497V11.9297C16.3711 11.5197 16.7111 11.1797 17.1211 11.1797C17.5311 11.1797 17.8711 11.5197 17.8711 11.9297V18.1497C17.8711 18.5697 17.5411 18.8997 17.1211 18.8997Z"
        fill="url(#paint2_linear_30854_16253)"
      />
      <path
        d="M6.88154 13.1804C6.54154 13.1804 6.24154 12.9504 6.15154 12.6104C6.05154 12.2104 6.29154 11.8004 6.70154 11.7004C10.3815 10.7804 13.6215 8.77041 16.0915 5.90041L16.5515 5.36041C16.8215 5.05041 17.2915 5.01041 17.6115 5.28041C17.9215 5.55041 17.9615 6.02041 17.6915 6.34041L17.2315 6.88041C14.5615 10.0004 11.0415 12.1704 7.06154 13.1604C7.00154 13.1804 6.94154 13.1804 6.88154 13.1804Z"
        fill="url(#paint3_linear_30854_16253)"
      />
      <path
        d="M17.1214 9.51961C16.7114 9.51961 16.3714 9.17961 16.3714 8.76961V6.59961H14.1914C13.7814 6.59961 13.4414 6.25961 13.4414 5.84961C13.4414 5.43961 13.7814 5.09961 14.1914 5.09961H17.1214C17.5314 5.09961 17.8714 5.43961 17.8714 5.84961V8.77961C17.8714 9.18961 17.5414 9.51961 17.1214 9.51961Z"
        fill="url(#paint4_linear_30854_16253)"
      />
      <path
        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
        fill="url(#paint5_linear_30854_16253)"
      />
      <defs>
        <linearGradient id="paint0_linear_30854_16253" x1="6.12891" y1="17.1151" x2="7.62891" y2="17.1151" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
        <linearGradient id="paint1_linear_30854_16253" x1="11.25" y1="16.075" x2="12.75" y2="16.075" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
        <linearGradient id="paint2_linear_30854_16253" x1="16.3711" y1="15.0397" x2="17.8711" y2="15.0397" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
        <linearGradient id="paint3_linear_30854_16253" x1="6.12891" y1="9.1405" x2="17.8714" y2="9.1405" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
        <linearGradient id="paint4_linear_30854_16253" x1="13.4414" y1="7.30961" x2="17.8714" y2="7.30961" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
        <linearGradient id="paint5_linear_30854_16253" x1="1.25" y1="12" x2="22.75" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D28BB" />
          <stop offset="1" stopColor="#357EEB" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default StatusIcon

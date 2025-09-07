import React from 'react'

interface IconProps {
  className?: string
}

const ExitIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.4286 6H4V21.75C4 22.3467 4.24082 22.919 4.66947 23.341C5.09812 23.7629 5.67951 24 6.28571 24H15.4286M16.5714 18.375L20 15M20 15L16.5714 11.625M20 15H8.57143"
        stroke="#332F36"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ExitIcon

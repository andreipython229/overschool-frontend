import React from 'react'

interface IconProps {
  className?: string
}

const XIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 21L9.38667 12.6133M9.38667 12.6133L1 1H6.55556L12.6133 9.38667M9.38667 12.6133L15.4444 21H21L12.6133 9.38667M21 1L12.6133 9.38667"
        stroke="#332F36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default XIcon

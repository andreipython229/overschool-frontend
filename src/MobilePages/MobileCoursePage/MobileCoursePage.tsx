import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MobileCoursePage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <span onClick={() => navigate(-1)}>Все курсы</span>
      <div>
        <div>
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  )
}

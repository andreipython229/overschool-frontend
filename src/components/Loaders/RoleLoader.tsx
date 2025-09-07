import React from 'react'
import { SimpleLoader } from './SimpleLoader'

export const RoleLoader: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px',
      }}
    >
      <SimpleLoader
        loaderColor="#357EEB"
        style={{
          width: '80px',
          height: '80px',
        }}
      />
      <div
        style={{
          color: '#357EEB',
          fontSize: '18px',
          fontWeight: '500',
        }}
      >
        Определение роли пользователя...
      </div>
    </div>
  )
}

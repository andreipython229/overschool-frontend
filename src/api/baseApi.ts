import { RootState } from 'store/redux/store'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // eslint-disable-next-line no-undef
    console.log('=== PREPARE HEADERS DEBUG ===')

    try {
      const state = getState() as RootState
      // eslint-disable-next-line no-undef
      console.log('Full state:', state)
      // eslint-disable-next-line no-undef
      console.log('state.user:', state.user)
      // eslint-disable-next-line no-undef
      console.log('state.user.authState:', state.user?.authState)
      // eslint-disable-next-line no-undef
      console.log('state.user.authState.access:', state.user?.authState?.access)

      let token = state.user?.authState?.access

      // Fallback на localStorage если Redux пустой
      if (!token || token === '') {
        token = localStorage.getItem('access_token')
        // eslint-disable-next-line no-undef
        console.log('🔄 FALLBACK: Token from localStorage:', token ? 'found' : 'not found')
      }

      if (token && token !== '') {
        headers.set('Authorization', `Bearer ${token}`)
        // eslint-disable-next-line no-undef
        console.log('✅ TOKEN SET:', `Bearer ${token}`)
      } else {
        // eslint-disable-next-line no-undef
        console.log('❌ NO TOKEN FOUND!')
        // eslint-disable-next-line no-undef
        console.log('Token value:', token)
        // eslint-disable-next-line no-undef
        console.log('Token type:', typeof token)
        // eslint-disable-next-line no-undef
        console.log('User state keys:', Object.keys(state.user || {}))
        // eslint-disable-next-line no-undef
        console.log('Auth state keys:', Object.keys(state.user?.authState || {}))
      }

      // eslint-disable-next-line no-undef
      console.log('Final headers:', headers)
      // eslint-disable-next-line no-undef
      console.log('=== END DEBUG ===')
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error in prepareHeaders:', error)
    }

    return headers
  },
})

import { Middleware } from '@reduxjs/toolkit'
import { RootState } from './redux/store'

const serverErrorMiddleware: Middleware<Record<string, unknown>, RootState> = store => next => action => {
  if (action.type.endsWith('/rejected') && action.payload) {
    const { status } = action.payload

    if (status === 514) {
      window.location.href = '/technical-works'
    }
  }

  return next(action)
}

export default serverErrorMiddleware

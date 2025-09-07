import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { authState, logoutState } from 'store/redux/users/slice'
import { refreshApi } from './refreshApi'
import { RootState } from 'store/redux/store'
import { Mutex } from 'async-mutex'
import { baseQuery } from './baseApi'

const mutex = new Mutex()

const requestQueue: (() => Promise<any>)[] = []

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        // Исправляем вызов refreshToken
        const refreshResult = await api
          .dispatch(refreshApi.endpoints.refreshToken.initiate((api.getState() as RootState).user.authState.refresh))
          .unwrap()

        if (refreshResult.access && refreshResult.refresh) {
          // Обновляем токены в Redux
          api.dispatch(authState(refreshResult))

          // Повторяем все запросы из очереди
          await Promise.all(requestQueue.map(fn => fn()))

          // Повторяем текущий запрос
          result = await baseQuery(args, api, extraOptions)

          // Очищаем очередь
          requestQueue.length = 0
        } else {
          // Если не удалось обновить токен - выходим
          api.dispatch(logoutState())
          requestQueue.length = 0
        }
      } finally {
        release()
      }
    } else {
      // Если mutex заблокирован, добавляем запрос в очередь
      return new Promise(resolve => {
        requestQueue.push(async () => {
          const retryResult = await baseQuery(args, api, extraOptions)
          resolve(retryResult)
          return retryResult
        })
      })
    }
  }
  return result
}

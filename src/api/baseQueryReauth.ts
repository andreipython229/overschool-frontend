import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { authState, logoutState } from 'store/redux/users/slice'
import { refreshApi } from './userLoginService'
import { RootState } from 'store/redux/store'
import { Mutex } from 'async-mutex'
import { baseQuery } from './baseApi'

const mutex = new Mutex()
const requestQueue: (string | FetchArgs)[] = []

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  console.log('Запрос:', args); // Логируем параметры запроса
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  // Проверка, если ответ есть, и он содержит строку, начинающуюся с HTML
  if (result.data && typeof result.data === 'string' && result.data.startsWith('<!DOCTYPE html>')) {
    console.warn('Ответ сервера — HTML-документ вместо JSON:', result.data);
  }

  if (result.error) {
    console.log('Ответ:', result); // Логируем ошибочный ответ
  } else {
    console.log('Ответ:', result); // Логируем успешный ответ
  }

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await api
          .dispatch(refreshApi.endpoints.refreshToken.initiate((api.getState() as RootState).user.authState.refresh))
          .unwrap()
        if (refreshResult.access && refreshResult.refresh) {
          api.dispatch(authState(refreshResult))
          // Обновление токена успешно, повторяем запросы из очереди
          for (const request of requestQueue) {
            console.log('Повтор запроса из очереди:', request); // Логируем повторяемый запрос
            try {
              result = await baseQuery(request, api, extraOptions)
              if (result.data && typeof result.data === 'string' && result.data.startsWith('<!DOCTYPE html>')) {
                console.warn('Ответ сервера — HTML-документ при повторном запросе:', result.data);
              }
              if (result.error) {
                console.warn('Ошибка при повторном запросе:', result);
              } else {
                console.log('Результат повторного запроса:', result);
              }
            } catch (err) {
              console.error('Исключение при повторном запросе:', err);
            }
          }
          requestQueue.length = 0 // чистка очереди
        } else {
          api.dispatch(logoutState())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      requestQueue.push(args) // добавление запросов в очередь
      console.log('Запрос добавлен в очередь:', args);
      result = await baseQuery(args, api, extraOptions)
      if (result.data && typeof result.data === 'string' && result.data.startsWith('<!DOCTYPE html>')) {
        console.warn('Ответ сервера — HTML-документ при выполнении из очереди:', result.data);
      }
      console.log('Результат из очереди:', result);
    }
  }
  return result
}
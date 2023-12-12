import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

// При развёртывании локально для получения кук на localhost - ставим true
// Не забываем ставить false перед деплоем!!!
const developmentMode = true;

export const baseQuery = (baseUrl = `/api/`) => {
  return fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: headers => {
      const acceessToken = cookies.get('access_token')
      headers.set('X-Development-Mode', `${developmentMode}`)
      if (acceessToken) {
        headers.set('Cookie', acceessToken)
      }
      return headers
    },
  })
}

// type BaseQueryFnArgs = Parameters<BaseQueryFn>[0];
// type BaseQueryFnResult<T> = Promise<T>;
//
// export function baseQueryFn(args: BaseQueryFnArgs, api: BaseQueryApi, extraOptions: BaseQueryExtraOptions<any>): BaseQueryFnResult<unknown> {
//     const schoolName = localStorage.getItem('school');
//
//     return fetchBaseQuery({
//         baseUrl: `/api/${schoolName}/`,
//         credentials: 'include',
//         prepareHeaders: (headers, {getState}) => {
//             const acceessToken = cookies.get('access_token')
//             if (acceessToken) {
//                 headers.set('Cookie', acceessToken)
//             }
//             return headers
//         },
//     }) as unknown as BaseQueryFnResult<unknown>;
// }

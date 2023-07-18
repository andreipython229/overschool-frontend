import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Cookies} from 'react-cookie'

const cookies = new Cookies();
const schoolName = 'School_1';


export const baseQuery = (baseUrl = `/api/${schoolName}`) => {
    return fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const acceessToken = cookies.get('access_token')

            if (acceessToken) {
                headers.set('Cookie', acceessToken)
            }
            return headers
        },
    });
}

// export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
//   const { user } = JSON.parse(`${localStorage?.getItem('persist:root')}`)
//   const refresh = JSON.parse(user).refresh_token

//   const formData = new FormData()

//   formData.append('refresh', refresh)

//   let result = await baseQuery(args, api, extraOptions)

//   if (result?.error?.status === 403 || result?.error?.status === 401) {
//     const refreshResult: any = await baseQuery(
//       {
//         url: '/token-refresh/',
//         method: 'POST',
//         body: formData,
//       },
//       api,
//       extraOptions,
//     )

//     if (refreshResult?.data) {
//       api.dispatch(
//         token({
//           access_token: refreshResult.data?.access as string,
//           refresh_token: refreshResult.data?.refresh,
//         }),
//       )

//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       api.dispatch(auth(false))
//       api.dispatch(token({ access_token: '' }))
//     }
//   }
//   return result
// }

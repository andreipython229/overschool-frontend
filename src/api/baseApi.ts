import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Cookies} from "react-cookie"
// import {BaseQueryApi, BaseQueryExtraOptions} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
// import {RootState} from "../store/redux/store";

const cookies = new Cookies()

export const baseQuery = (baseUrl = `/api/`) => {
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
    })
};

export const baseQueryFn = (baseUrl = `/api/`) => {
    const schoolName = localStorage.getItem('school')

    return fetchBaseQuery({
        baseUrl: baseUrl + String(schoolName),
        credentials: 'include',
        prepareHeaders: (headers, {getState}) => {
            const acceessToken = cookies.get('access_token')
            if (acceessToken) {
                headers.set('Cookie', acceessToken)
            }
            return headers
        },
    })
};

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


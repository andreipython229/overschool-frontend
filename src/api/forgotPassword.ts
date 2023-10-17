import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'


import {baseQuery} from "./baseApi";
import { IForgotPassword } from './apiTypes';
import { formDataConverter } from '../utils/formDataConverter'

export const forgotPassword = createApi({
    reducerPath: 'forgotPassword',
    baseQuery: baseQuery(),
    endpoints: build => ({
        forgotPassword: build.mutation<IForgotPassword, any>({
            query: credentials => {
              const formdata = formDataConverter(credentials)
              return {
                url: '/forgot_password/',
                method: 'POST',
                body: formdata,
                responseHandler: response => response.text(),
              }
            },
            
          }),
    }),
})
export const { useForgotPasswordMutation } = forgotPassword;
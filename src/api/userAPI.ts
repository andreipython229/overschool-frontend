import {AxiosError} from 'axios'

import {instance} from 'api/config'
import {LoginParamsT} from "utils/validationLogin";


export const userAPI = {
    register: async () => {
        try {
            // const res = await instance.post('auth/register', body)
            // return res.data
        } catch (e) {
            // return (e as AxiosError)?.response?.data?.error || 'some error'
        }
    },
    login: async (body: LoginParamsT) => {
        try {
            return await instance.post<ResponseType>('auth/login', body)
        } catch (e) {
            // return (e as AxiosError)?.response?.data?.error || 'some error'
        }
    },
    me: async () => await instance.post<ResponseType>('auth/me', {}),

    logOut: async () => await instance.delete('auth/me'),

    // update: async (body: any) => await instance.put('auth/me', body),
    //
    // setNewPassword: async (body: SetNewPasswordRequestType) =>
    //     await instance.post('auth/set-new-password', body),
    // forgot: async (email: string) => {
    //     const body = {
    //         email,
    //         from: 'you',
    //         message: `<div style='background-color: lime; padding: 15px'>password recovery link:
    //             <a href='http://localhost:3000/#/set-new-password$token$'>link</a></div>`,
    //     }
    //     try {
    //         const res = await instance.post('auth/forgot', body)
    //         return res.data
    //     } catch (e) {
    //         // return (e as AxiosError)?.response?.data?.error
    //     }
    // },
}
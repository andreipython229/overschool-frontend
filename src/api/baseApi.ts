import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Cookies} from "react-cookie"
import {useParams} from "react-router-dom";

const schoolName = 'School_1'
const cookies = new Cookies()

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
    })}


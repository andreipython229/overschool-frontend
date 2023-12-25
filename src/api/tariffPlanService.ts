import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { ITariff } from 'types/userT'

export type TariffPlanT = {
  price_rf_rub: number
  id: number
  name: string
  number_of_courses: number | null
  number_of_staff: number | null
  students_per_month: number | null
  total_students: number | null
  price: string
}

export const tariffPlanService = createApi({
  reducerPath: 'tariffPlanService',
  baseQuery: baseQuery(),
  tagTypes: ['tariffPlan'],
  endpoints: build => ({
    fetchTariffPlanTable: build.query<TariffPlanT[], void>({
      query: () => ({
        url: '/schools_tariff/',
      }),
      providesTags: ['tariffPlan'],
    }),
  }),
})

export const tariffPlan = createApi({
  reducerPath: 'tariffPlan',
  baseQuery: baseQuery(),
  tagTypes: ['tariffPlanInfo'],
  endpoints: build => ({
    fetchTariffPlanInfo: build.query<any, number | string>({
      query: id => ({
        url: `/schools_tariff/${id}`,
      }),
      providesTags: ['tariffPlanInfo'],
    }),
  }),
})

export const tariffService = createApi({
  reducerPath: 'tariffService',
  baseQuery: baseQuery(),
  tagTypes: ['tariffInfo'],
  endpoints: build => ({
    fetchCurrentTariffPlan: build.query<ITariff, string>({
      query: schoolName => ({
        url: `/${schoolName}/current_tariff/`,
      }),
      providesTags: ['tariffInfo'],
    }),
  }),
})

export const { useFetchTariffPlanTableQuery } = tariffPlanService
export const { useFetchCurrentTariffPlanQuery, useLazyFetchCurrentTariffPlanQuery } = tariffService
export const { useFetchTariffPlanInfoQuery, useLazyFetchTariffPlanInfoQuery } = tariffPlan

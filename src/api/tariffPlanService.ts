import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

export type TariffPlanT = {
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

export const { useFetchTariffPlanTableQuery } = tariffPlanService

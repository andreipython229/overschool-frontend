import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { Domain, updateDomain } from '../types/domainT'
import { SchoolT } from 'Pages/ChooseSchool/ChooseSchool'
import { baseQueryWithReauth } from './baseQueryReauth'

export const domainService = createApi({
  reducerPath: 'domainService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['domain'],
  endpoints: build => ({
    fetchDomain: build.query<Domain[], { schoolName: string }>({
      query: ({ schoolName }) => ({
        url: `/${schoolName}/school_domain/`,
      }),
      providesTags: ['domain'],
    }),
    createDomain: build.mutation<Domain, { data: Domain; schoolName: string }>({
      query: ({ data, schoolName }) => ({
        url: `/${schoolName}/school_domain/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['domain'],
    }),
    updateDomain: build.mutation<updateDomain, { id?: number; data: Domain; schoolName: string }>({
      query: ({ id, data, schoolName }) => ({
        url: `/${schoolName}/school_domain/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['domain'],
    }),
    deleteDomain: build.mutation<void, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/school_domain/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['domain'],
    }),
    fetchConfiguredDomains: build.query<Domain[], void>({
      query: () => ({
        url: '/configured_domains/',
      }),
      providesTags: ['domain'],
    }),
    fetchSchoolByDomain: build.query<SchoolT, { domain: string }>({
      query: ({ domain }) => ({
        url: '/school-by-domain/',
        params: { domain },
      }),
    }),
  }),
})

export const {
  useFetchDomainQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
  useFetchConfiguredDomainsQuery,
  useFetchSchoolByDomainQuery,
  useLazyFetchSchoolByDomainQuery,
} = domainService

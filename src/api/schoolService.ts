import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { schoolT } from '../types/schoolHeaderT'
import { UpdateCourses } from './apiTypes'
import { baseQuery } from './baseApi'

interface ResponsePaymentMethod {
  id: number;
  payment_method: string;
  payment_method_name: string;
  payment_link: string;
  secret_key: string;
  school: number;
}

interface PaymentMethod {
  payment_method: string;
  payment_method_name: string;
  payment_link: string;
  secret_key: string;
  school: number;
}

interface PaymentMethodListResponse {
  results: ResponsePaymentMethod[];
}

export const schoolService = createApi({
  reducerPath: 'schoolService',
  baseQuery: baseQuery(),
  tagTypes: ['school'],
  endpoints: build => ({
    fetchSchool: build.query<schoolT, number>({
      query: (id?: number) => ({
        url: `/schools/${id}/`,
      }),
      providesTags: ['school'],
    }),
    setSchool: build.mutation<schoolT, UpdateCourses>({
      query: ({ formdata, id }) => ({
        url: `/schools/${id}/`,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['school'],
    }),
    createSchool: build.mutation<schoolT, FormData>({
      query: formdata => ({
        url: `/schools/`,
        method: 'POST',
        body: formdata,
        responseHandler: response => response.text(),
      }),
      invalidatesTags: ['school'],
    }),
    fetchSchoolDocument: build.query<any, string>({
      query: schoolName => ({
        url: `/${schoolName}/school_document/`,
      }),
    }),
    setSchoolDocuments: build.mutation<any, { data: FormData; schoolName: string }>({
      query: body => ({
        url: `/${body.schoolName}/school_document/`,
        method: 'POST',
        body: body.data,
      }),
    }),
    updateSchoolDocuments: build.mutation<any, { id: number; data: FormData; schoolName: string }>({
      query: body => ({
        url: `/${body.schoolName}/school_document/${body.id}/`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
    setPaymentMethod: build.mutation<PaymentMethodListResponse, PaymentMethod>({
      query: body => ({
        url: `/payment_method/`,
        method: 'POST',
        body: body,
      }),
    }),
    fetchPaymentMethods: build.query<PaymentMethodListResponse, { school_id: number }>({
      query: ({ school_id }) => ({
        url: `/payment_method/?school_id=${school_id}`,
        method: 'GET',
      }),
    }),
  }),
})


export const { 
  useFetchSchoolQuery, 
  useSetSchoolMutation, 
  useCreateSchoolMutation, 
  useLazyFetchSchoolDocumentQuery, 
  useSetSchoolDocumentsMutation, 
  useUpdateSchoolDocumentsMutation,
  useSetPaymentMethodMutation,
  useLazyFetchPaymentMethodsQuery,
} = schoolService;
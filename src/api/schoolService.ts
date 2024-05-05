import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {schoolT} from '../types/schoolHeaderT'
import {UpdateCourses} from './apiTypes'
import {baseQuery} from './baseApi'
import {
    PaymentMethod,
    PaymentMethodListResponse,
    PaymentLinkCreatePayload,
    SchoolPaymentLinkList,
    CreatePaymentLinkResponse,
    SchoolPaymentLink,
    UpdatePaymentLinkPayload
} from '../types/paymentT';
import {
    CreateProdamusPaymentLinkData, ProdamusPaymentlinkResponse,
    UpdateProdamusPaymentLinkData, ProdamusPaymentLinkList
} from '../types/ProdamusPaymenT';
import { schoolStudentsGroupingData } from 'types/studentsGroup';

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
            query: ({formdata, id}) => ({
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
            query: ({school_id}) => ({
                url: `/payment_method/?school_id=${school_id}`,
                method: 'GET',
            }),
        }),
        deletePaymentMethod: build.mutation<PaymentMethodListResponse, string>({
            query: account_no => ({
                url: `/payment_method/`,
                method: 'DELETE',
                body: {account_no},
            }),
        }),
        createPaymentLink: build.mutation<CreatePaymentLinkResponse, PaymentLinkCreatePayload>({
            query: data => ({
                url: `/payment_link/`,
                method: 'POST',
                body: data,
            }),
        }),
        fetchPaymentLinks: build.query<SchoolPaymentLinkList, { school_id: number }>({
            query: ({school_id}) => ({
                url: `/payment_link/?school_id=${school_id}`,
                method: 'GET',
            }),
        }),
        deletePaymentLink: build.mutation<void, number>({
            query: invoice_no => ({
                url: `/payment_link/${invoice_no}/`,
                method: 'DELETE',
            }),
        }),
        updatePaymentLink: build.mutation<SchoolPaymentLink, UpdatePaymentLinkPayload>({
            query: data => ({
                url: `/payment_link/${data.id}/`,
                method: 'PATCH',
                body: {data},
            }),
        }),
        createProdamusPaymentLink: build.mutation<ProdamusPaymentlinkResponse, CreateProdamusPaymentLinkData>(
            {
                query: data => ({
                    url: `/prodamus_payment_link/`,
                    method: 'POST',
                    body: data,
                })
            }),
        updateProdamusPaymentLink: build.mutation<ProdamusPaymentlinkResponse, UpdateProdamusPaymentLinkData>({
            query: data => ({
                url: `/prodamus_payment_link/${data.id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),

        deleteProdamusPaymentLink: build.mutation<void, number>({
            query: id => ({
                url: `/prodamus_payment_link/${id}/`,
                method: 'DELETE',
            }),
        }),

        fetchProdamusPaymentLinks: build.query<ProdamusPaymentLinkList, { school_id: number }>({
            query: ({school_id}) => ({
                url: `/prodamus_payment_link/?school_id=${school_id}`,
                method: 'GET',
            }),
        }),
        fetchSchoolStudentsGrouping: build.query<schoolStudentsGroupingData, { school_id: number }>({
          query: ({ school_id }) => ({
            url: `/school_students_table_settings/${school_id}/`,
            method: 'GET',
          }),
        }),
        updateSchoolStudentsGrouping: build.mutation<void, { school: number; is_students_grouped: boolean }>({
          query: ({ school, is_students_grouped }) => ({
            url: `/school_students_table_settings/${school}/`,
            method: 'PUT',
            body: { is_students_grouped, school },
          }),
        }),
        updateUserPseudonym: build.mutation<void, { school: number; pseudonym: string, user: number }>({
            query: ({ school, pseudonym, user }) => ({
                url: `/user_pseudonym/${school}/`,
                method: 'PUT',
                body: {
                    pseudonym,
                    school,
                    user
                },
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
    useDeletePaymentMethodMutation,
    useCreatePaymentLinkMutation,
    useLazyFetchPaymentLinksQuery,
    useDeletePaymentLinkMutation,
    useUpdatePaymentLinkMutation,
    useCreateProdamusPaymentLinkMutation,
    useUpdateProdamusPaymentLinkMutation,
    useDeleteProdamusPaymentLinkMutation,
    useLazyFetchProdamusPaymentLinksQuery,
    useFetchSchoolStudentsGroupingQuery,
    useUpdateSchoolStudentsGroupingMutation,
    useUpdateUserPseudonymMutation
} = schoolService;
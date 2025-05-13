import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { schoolT } from '../types/schoolHeaderT'
import { UpdateCourses, NewsletterTemplate, IInviteProgramResp, IInviteProgramReq } from './apiTypes'
import { baseQuery } from './baseApi'
import {
  PaymentMethod,
  PaymentMethodListResponse,
  PaymentLinkCreatePayload,
  SchoolPaymentLinkList,
  CreatePaymentLinkResponse,
  SchoolPaymentLink,
  UpdatePaymentLinkPayload,
} from '../types/paymentT'
import {
  CreateProdamusPaymentLinkData,
  ProdamusPaymentlinkResponse,
  UpdateProdamusPaymentLinkData,
  ProdamusPaymentLinkList,
} from '../types/ProdamusPaymenT'
import { schoolStudentsGroupingData } from 'types/studentsGroup'
import { baseQueryWithReauth } from './baseQueryReauth'
import { a } from 'msw/lib/glossary-dc3fd077'

export const schoolService = createApi({
  reducerPath: 'schoolService',
  baseQuery: baseQueryWithReauth,
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
    createSchoolWCredentials: build.mutation<schoolT, { school_name: string; phone_number: string }>({
      query: data => ({
        url: `/register-school-owner/`,
        method: 'POST',
        body: data,
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
    deletePaymentMethod: build.mutation<PaymentMethodListResponse, string>({
      query: account_no => ({
        url: `/payment_method/`,
        method: 'DELETE',
        body: { account_no },
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
      query: ({ school_id }) => ({
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
        body: { data },
      }),
    }),
    createProdamusPaymentLink: build.mutation<ProdamusPaymentlinkResponse, CreateProdamusPaymentLinkData>({
      query: data => ({
        url: `/prodamus_payment_link/`,
        method: 'POST',
        body: data,
      }),
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
      query: ({ school_id }) => ({
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
    updateUserPseudonym: build.mutation<void, { schoolName: string; school: number; pseudonym: string; user: number }>({
      query: ({ schoolName, school, pseudonym, user }) => ({
        url: `/${schoolName}/user_pseudonym/${school}/`,
        method: 'PUT',
        body: {
          pseudonym,
          school,
          user,
        },
      }),
    }),
    createNewsletterTemplate: build.mutation<
      void,
      { schoolName: string; is_public: boolean; template_name: string; text: string; delay_days: number }
    >({
      query: ({ schoolName, is_public, template_name, text, delay_days }) => ({
        url: `/${schoolName}/newsletter_templates/`,
        method: 'POST',
        body: {
          is_public,
          template_name,
          text,
          delay_days,
        },
      }),
    }),
    fetchNewsletterTemplates: build.query<
      { id: number; is_public: boolean; template_name: string; text: string; delay_days: number }[],
      { schoolName: string }
    >({
      query: ({ schoolName }) => ({
        url: `/${schoolName}/newsletter_templates/`,
        method: 'GET',
      }),
    }),
    deleteNewsletterTemplate: build.mutation<void, { schoolName: string; id: number }>({
      query: ({ schoolName, id }) => ({
        url: `/${schoolName}/newsletter_templates/`,
        method: 'DELETE',
        body: { id },
      }),
    }),
    updateNewsletterTemplate: build.mutation<
      void,
      { schoolName: string; id: number; is_public: boolean; template_name: string; text: string; delay_days: number }
    >({
      query: ({ schoolName, id, is_public, template_name, text, delay_days }) => ({
        url: `/${schoolName}/newsletter_templates/${id}/`,
        method: 'PATCH',
        body: {
          is_public,
          template_name,
          text,
          delay_days,
        },
      }),
    }),
    assignRole: build.mutation<void, { school_id: number; user_id: number; role_name: string }>({
      query: ({ school_id, user_id, role_name }) => ({
        url: `/school-new-roles/assign_role/`,
        method: 'POST',
        body: {
          school_id,
          user_id,
          role_name,
        },
      }),
    }),
    removeRole: build.mutation<void, { school_id: number; user_id: number; role_name: string }>({
      query: ({ school_id, user_id, role_name }) => ({
        url: `/school-new-roles/remove_role/`,
        method: 'DELETE',
        body: {
          school_id,
          user_id,
          role_name,
        },
      }),
    }),
    fetchRolesByUser: build.query<{ school: number; role_name: string }[], { user_id: number }>({
      query: ({ user_id }) => ({
        url: `/school-new-roles/get_roles_by_user/`,
        method: 'GET',
        params: {
          user_id,
        },
      }),
    }),
    fetchInvitesProgram: build.query<IInviteProgramResp[], string>({
      query: schoolName => `/${schoolName}/invites_program/`,
    }),
    fetchStudentInvitesProgramLink: build.query<IInviteProgramResp, string>({
      query: schoolName => `/${schoolName}/invites_program/`,
    }),
    updateInvitesProgram: build.mutation<IInviteProgramResp, IInviteProgramReq>({
      query: args => ({
        url: `/${args.schoolName}/invites_program/${args.id}/`,
        method: 'PATCH',
        body: args.data,
      }),
    }),
    createInvitesProgramLink: build.mutation<IInviteProgramResp, { link: string; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/invites_program/`,
        method: 'POST',
        body: { link: args.link },
      }),
    }),
    deleteInvitesProgramLink: build.mutation<void, { id: number; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/invites_program/${args.id}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLazyFetchStudentInvitesProgramLinkQuery,
  useDeleteInvitesProgramLinkMutation,
  useCreateInvitesProgramLinkMutation,
  useUpdateInvitesProgramMutation,
  useLazyFetchInvitesProgramQuery,
  useFetchInvitesProgramQuery,
  useLazyFetchSchoolQuery,
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
  useUpdateUserPseudonymMutation,
  useCreateNewsletterTemplateMutation,
  useFetchNewsletterTemplatesQuery,
  useLazyFetchNewsletterTemplatesQuery,
  useDeleteNewsletterTemplateMutation,
  useUpdateNewsletterTemplateMutation,
  useAssignRoleMutation,
  useRemoveRoleMutation,
  useFetchRolesByUserQuery,
  useCreateSchoolWCredentialsMutation,
} = schoolService

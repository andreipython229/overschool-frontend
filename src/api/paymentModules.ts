import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreatePaymentRequestData, ResponseData } from 'types/paymentT';


const mainBaseUrl = 'https://api.express-pay.by/v1/';
const testBaseUrl = 'https://sandbox-api.express-pay.by/v1/';

const expressPayMainApi = createApi({
  reducerPath: 'expressPayMainApi',
  baseQuery: fetchBaseQuery({ baseUrl: mainBaseUrl }),
  endpoints: (builder) => ({
    fetchInvoiceDetails: builder.query<{ Status: string, FirstName: string, Surname: string, Patronymic: string }, {invoiceNo: number, apiKey: string}>({
      query: ({ invoiceNo, apiKey }) => ({
        url: `invoices/${invoiceNo}?token=${apiKey}`,
      }),
    }),
    createNewLink: builder.mutation<ResponseData, CreatePaymentRequestData>({
      query: (requestData) => ({
        url: `invoices?token=${requestData.Token}`,
        method: 'POST',
        body: requestData,
      }),
    }),
  }),
});

const expressPayTestApi = createApi({
  reducerPath: 'expressPayTestApi',
  baseQuery: fetchBaseQuery({ baseUrl: testBaseUrl }),
  endpoints: (builder) => ({
    fetchInvoiceDetailsTest: builder.query<{ Status: string, FirstName: string, Surname: string, Patronymic: string }, void>({
      query: () => ({
        url: `invoices/100?token=a75b74cbcfe446509e8ee874f421bd64`,
      }),
    }),
    createTestNewLink: builder.mutation<ResponseData, CreatePaymentRequestData>({
      query: (requestData) => ({
        url: `invoices?token=${requestData.Token}`,
        method: 'POST',
        body: requestData,
      }),
    }),
  }),
});

export const { 
  useLazyFetchInvoiceDetailsQuery, 
  useCreateNewLinkMutation,
} = expressPayMainApi;

export const { 
  useLazyFetchInvoiceDetailsTestQuery,
  useCreateTestNewLinkMutation
} = expressPayTestApi;
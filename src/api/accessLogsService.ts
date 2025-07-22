import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryReauth';

export interface CustomEvent {
  id: number;
  method: string;
  path: string;
  status_code: number;
  response_ms: number;
  requested_at: string;
  remote_addr: string;
  host: string;
  view: string;
  view_method: string;
  user_email: string | null;
  data: string;
  query_params: string;
  response: string;
  errors: string | null;
}

export interface AccessLogsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CustomEvent[];
}

export interface AccessLogsFilters {
  email?: string;
  role?: string;
  method?: string;
  status?: string;
  requested_at__gte?: string;
  requested_at__lte?: string;
  p?: number; // номер страницы
  s?: number; // количество записей на странице
}

export const accessLogsApi = createApi({
  reducerPath: 'accessLogsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AccessLogs'],
  endpoints: (builder) => ({
    getAccessLogs: builder.query<AccessLogsResponse, AccessLogsFilters>({
      query: (filters) => ({
        url: 'api-request-logs/',
        params: filters,
      }),
      providesTags: ['AccessLogs'],
    }),
  }),
});

export const { useGetAccessLogsQuery } = accessLogsApi; 
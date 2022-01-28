// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "same-origin",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verifySignup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "PUT",
        body: credentials,
      }),
    }),
    getProfile: builder.query({
      query: (credentials) => ({
        url: "/users/profiles/info",
        method: "POST",
        body: credentials,
      }),
    }),
    recoverPassword: builder.mutation({
      query: (data) => ({
        url: "/users/profiles/password/recovery",
        method: "POST",
        body: data,
      }),
    }),
    verifyRecoveryCode: builder.mutation({
      query: (credentials) => ({
        url: "/users/profiles/password/recovery/2fa",
        method: "POST",
        body: credentials,
      }),
    }),
    newPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/profiles/password/recovery/new",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/password/new",
        method: "POST",
        body: credentials,
      }),
    }),
    deleteAccount: builder.mutation({
      query: (credentials) => ({
        url: "users/profiles/delete",
        method: "DELETE",
        body: credentials,
      }),
    }),
    storeToken: builder.mutation({
      query: (credentials) => ({
        url: "/users/tokens",
        method: "POST",
        body: credentials,
      }),
    }),
    tokenRevoke: builder.mutation({
      query: (credentials) => ({
        url: "/users/tokens/revoke",
        method: "POST",
        body: credentials,
      }),
    }),
    getProviders: builder.query({
      query: (credentials) => ({
        url: "/users/providers",
        method: "POST",
        body: credentials,
      }),
    }),
    getDocs: builder.query({
      query: () => ({
        url: process.env.REACT_APP_DOCS_URL,
        responseHandler: (response) => response.text(), // expect response type to be text/plain
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDocsQuery,
  useLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useGetProvidersQuery,
  useStoreTokenMutation,
  useNewPasswordMutation,
  useTokenRevokeMutation,
  useVerifySignupMutation,
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useVerifyRecoveryCodeMutation,
} = API;

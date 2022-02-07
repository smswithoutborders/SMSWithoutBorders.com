// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: ({ uid }) => ({
        url: `/users/${uid}/logout`,
        method: "POST",
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
      query: ({ uid, url, phone_number }) => ({
        url: `/users/${uid}${url}`,
        method: "POST",
        body: phone_number ? { phone_number } : {}, // if theres a phone number then send it
      }),
    }),
    verifyTokenStorage: builder.mutation({
      query: ({
        uid,
        code,
        platform,
        protocol,
        oauth_token,
        oauth_verifier,
        phone_number,
      }) => ({
        url: `/users/${uid}/platforms/${platform}/protocols/${protocol}`,
        method: "PUT",
        body: {
          code,
          oauth_token,
          oauth_verifier,
          phone_number,
        },
      }),
    }),
    createExternalAccount: builder.mutation({
      query: ({
        uid,
        platform,
        protocol,
        first_name,
        last_name,
        phone_number,
      }) => ({
        url: `/users/${uid}/platforms/${platform}/protocols/${protocol}/register`,
        method: "PUT",
        body: {
          first_name,
          last_name,
          phone_number,
        },
      }),
    }),
    tokenRevoke: builder.mutation({
      query: ({ uid, url, password }) => ({
        url: `/users/${uid}${url}`,
        method: "DELETE",
        body: {
          password: password,
        },
      }),
    }),
    getPlatforms: builder.query({
      query: ({ uid }) => ({
        url: `/users/${uid}/platforms`,
        method: "GET",
      }),
    }),
    getDocs: builder.query({
      query: () => ({
        url: process.env.REACT_APP_DOCS_URL,
        method: "GET",
        credentials: "omit",
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
  useLogoutMutation,
  useSignupMutation,
  useGetProfileQuery,
  useGetPlatformsQuery,
  useStoreTokenMutation,
  useNewPasswordMutation,
  useTokenRevokeMutation,
  useVerifySignupMutation,
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useVerifyRecoveryCodeMutation,
  useVerifyTokenStorageMutation,
  useCreateExternalAccountMutation,
} = API;

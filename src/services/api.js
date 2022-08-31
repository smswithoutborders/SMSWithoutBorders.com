// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`,
    headers: {
      "content-type": "application/json",
    },
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
      query: () => ({
        url: "/signup",
        method: "PUT",
      }),
    }),
    getMetrics: builder.query({
      query: ({ uid }) => ({
        url: `/users/${uid}/dashboard`,
        method: "GET",
      }),
    }),
    recoverPassword: builder.mutation({
      query: (phone_number) => ({
        url: "/recovery",
        method: "POST",
        body: {
          phone_number,
        },
      }),
    }),
    newPassword: builder.mutation({
      query: ({ uid, new_password }) => ({
        url: `/users/${uid}/recovery`,
        method: "PUT",
        body: {
          new_password,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ uid, password, new_password }) => ({
        url: `/users/${uid}/password`,
        method: "POST",
        body: {
          password: password,
          new_password: new_password,
        },
      }),
    }),
    deleteAccount: builder.mutation({
      query: ({ uid, password }) => ({
        url: `/users/${uid}`,
        method: "DELETE",
        body: {
          password,
        },
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
        scope,
        platform,
        protocol,
        code_verifier,
        phone_number,
      }) => ({
        url: `/users/${uid}/platforms/${platform}/protocols/${protocol}`,
        method: "PUT",
        body: {
          code,
          scope,
          code_verifier,
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
      transformResponse: (response) => {
        return {
          savedPlatforms: response.saved_platforms,
          unSavedPlatforms: response.unsaved_platforms,
        };
      },
    }),
    getPrivacyPolicy: builder.query({
      query: (locale) => ({
        url: `${process.env.REACT_APP_PRIVACY_POLICY_URL}/${locale}.md`,
        method: "GET",
        credentials: "omit",
        headers: {
          "content-type": "text/plain",
        },
        responseHandler: (response) => response.text(), // expect response type to be text/plain
      }),
    }),
    synchronize: builder.mutation({
      query: ({ uid }) => ({
        url: `${process.env.REACT_APP_GATEWAY_SERVER}/${process.env.REACT_APP_GATEWAY_SERVER_VERSION}/sync/users/${uid}`,
        method: "GET",
        headers: {
          "content-type": "text/plain",
        },
        responseHandler: (response) => response.text(), // expect response type to be text/plain
      }),
      transformResponse: (response) => {
        return {
          syncURL: response,
        };
      },
    }),
    triggerOTP: builder.query({
      query: ({ uid, phone_number, country_code }) => ({
        url: `/users/${uid}/OTP`,
        method: "POST",
        body: {
          phone_number: country_code + phone_number,
        },
      }),
    }),
    validateOTPCode: builder.mutation({
      query: (code) => ({
        url: "/OTP",
        method: "PUT",
        body: {
          code,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetMetricsQuery,
  useTriggerOTPQuery,
  useGetPlatformsQuery,
  useStoreTokenMutation,
  useNewPasswordMutation,
  useSynchronizeMutation,
  useTokenRevokeMutation,
  useVerifySignupMutation,
  useDeleteAccountMutation,
  useGetPrivacyPolicyQuery,
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useValidateOTPCodeMutation,
  useVerifyTokenStorageMutation,
  useCreateExternalAccountMutation,
} = API;

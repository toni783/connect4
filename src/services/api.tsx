import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

/**
 * Note: Redux toolkit query has issues with cyclic dependencies when using code splitting,
 * https://github.com/reduxjs/redux-toolkit/issues/2817
 * https://github.com/reduxjs/redux-toolkit/issues/2817#issuecomment-1304504920
 *
 * Even tough we have one present on the examples provided by them it seems this issue
 * only affects some imports ,so take this into consideration when configuring code splitting for
 * tests
 */
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string | undefined } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const GAMES_TAGS = "Games";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: () => ({}),
  tagTypes: [GAMES_TAGS],
});

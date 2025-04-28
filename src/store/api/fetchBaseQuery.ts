import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
  fetchFn: async (input, init) => {
    const response = await fetch(input, init);
    return response;
  },
});

export const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if ((result?.error?.data as { message?: string })?.message === 'invalid token') {
    
    console.log("Access token expired or invalid. Logging out...");

    localStorage.removeItem("authToken");
    
    window.location.href = "/login";
  }

  return result;
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/helper/notification";
import { notifyType } from "../../utils/helper/notificationType";
import { useCookies } from "react-cookie";

axios.defaults.baseURL = import.meta.env.VITE_CROPCONNECT_API;

const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies([
    "user_access_token",
    "seller_access_token",
  ]);

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {},
    showToast = true,
    withCredentials = false
  ) => {
    setIsLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: body,
        headers,
        withCredentials,
      });

      if (response.data.cookies) {
        Object.keys(response.data.cookies).forEach((cookie) => {
          setCookie(cookie, response.data.cookies[cookie]);
        });
      }

      console.log("URL RESPONSE", url, " ", response);
      if (showToast) notify(response.data.message, "success");
      return response;
    } catch (error) {
      console.log(error);

      if (error.response.status === 504) {
        notify(
          "Gateway timeout occurred. Please try to reload the page.",
          "error"
        );
        return;
      }
      if (showToast)
        notify(error.response.data.message, notifyType(error.response.status));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendAuthorizedRequest = async (
    requestType = "user",
    url,
    method = "GET",
    body = null,
    headers = {},
    showToast = true,
    withCredentials = false
  ) => {
    if (requestType === "user" && !cookies.user_access_token) {
      notify("Please login as user to continue", "info");
      return false;
    }

    if (requestType === "seller" && !cookies.seller_access_token) {
      notify("Please login as seller to continue", "info");
      return false;
    }

    return await sendRequest(
      url,
      method,
      body,
      {
        authorization: `Bearer ${
          requestType === "user"
            ? cookies.user_access_token
            : cookies.seller_access_token
        }`,
        ...headers,
      },
      showToast,
      withCredentials
    );
  };

  return { isLoading, sendRequest, sendAuthorizedRequest, setIsLoading };
};

export default useHttpClient;

// import React, { useState } from "react";
// import axios from "axios";
// import { notify } from "../../utils/helper/notification";
// import { notifyType } from "../../utils/helper/notificationType";
// import { useCookies } from "react-cookie";

// axios.defaults.baseURL = import.meta.env.VITE_CROPCONNECT_API;

// const useHttpClient = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [cookies, setCookie] = useCookies([
//     "user_access_token",
//     "seller_access_token",
//   ]);

//   const handleCookies = (cookiesData) => {
//     if (cookiesData) {
//       Object.keys(cookiesData).forEach((cookie) =>
//         setCookie(cookie, cookiesData[cookie])
//       );
//     }
//   };

//   const handleError = (error, showToast) => {
//     console.error("Request Error:", error);
//     if (error.response?.status === 504) {
//       notify("Gateway timeout occurred. Please try to reload the page.", "error");
//       return;
//     }
//     if (showToast) {
//       notify(error.response?.data?.message || "An error occurred", notifyType(error.response?.status || 500));
//     }
//     throw error;
//   };

//   const sendRequest = async ({
//     url,
//     method = "GET",
//     data = null,
//     headers = {},
//     showToast = true,
//     withCredentials = false,
//   }) => {
//     setIsLoading(true);
//     try {
//       const response = await axios({ url, method, data, headers, withCredentials });
//       handleCookies(response.data.cookies);
//       if (showToast) notify(response.data.message, "success");
//       return response;
//     } catch (error) {
//       handleError(error, showToast);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendAuthorizedRequest = async ({
//     requestType = "user",
//     url,
//     method = "GET",
//     data = null,
//     headers = {},
//     showToast = true,
//     withCredentials = false,
//   }) => {
//     const tokenKey = requestType === "user" ? "user_access_token" : "seller_access_token";
//     const token = cookies[tokenKey];

//     if (!token) {
//       notify(`Please login as ${requestType} to continue`, "info");
//       return false;
//     }

//     const authHeaders = {
//       ...headers,
//       Authorization: `Bearer ${token}`,
//     };

//     return sendRequest({
//       url,
//       method,
//       data,
//       headers: authHeaders,
//       showToast,
//       withCredentials,
//     });
//   };

//   return { isLoading, sendRequest, sendAuthorizedRequest, setIsLoading };
// };

// export default useHttpClient;

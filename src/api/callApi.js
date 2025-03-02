import { goToPage } from "@/states/modules/app";
import { setAuthSuccess } from "@/states/modules/auth/index.js";
import { getAuthToken, removeAuthToken } from "@/utils/localStorage";
import axios from "axios";
import { isFunction } from "lodash";

export default async function callApi(
  {
    method,
    apiPath,
    actionTypes: [
      requestType,
      successType,
      failureType
    ],
    variables,
    dispatch,
    getState,
    headers,
    tokenOther
  }
) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }
  
  const baseUrlApi = import.meta.env.VITE_API_URL;
  const token = getAuthToken();
  const generalToken = tokenOther ? tokenOther : ""
  const header = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : generalToken
  };
  dispatch(requestType())
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? {...header, ...headers} : header,
    method: method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : ''
  })
    .then(function (response) {
      dispatch(successType(response))
      return response;
    })
    .catch((error) => {
      let response = error.response ? error.response : error;
      dispatch(failureType(error.response));
      if (response.status === 401) {
        if (apiPath.includes('reset-password')) {
          dispatch(goToPage({path: '/forgot-password'}));
        } else {
          removeAuthToken();
          // dispatch(goToPage({path: '/login'}));
          dispatch(setAuthSuccess(false));
        }
      } else if (response.status === 403) {
        dispatch(goToPage({path: '/'}));
      }
      return response;
    })
}


/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const makeApiCall = async (method, url, data = {}, additionalHeaders = {}) => {
  const headers = {
    Authorization: `Bearer ${secureLocalStorage.getItem("authUser")}`,
  }
  const headersWithContentType = {
    ...headers,
    ...additionalHeaders,
  }
  const config = {
    method,
    url,
    headers: headersWithContentType,
    data,
  }
  return await axios.request(config)
}

export default makeApiCall

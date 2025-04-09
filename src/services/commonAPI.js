import axios from "axios";

export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
  const reqConfig = {
    method: httpRequest,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  try {
    const result = await axios(reqConfig);
    return result;
  } catch (err) {
    // Optional: Log and throw only relevant error
    console.error("API Error:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};





// import axios from "axios";


// export const commonAPI = async (httpRequest, url, reqBody, reqHeader) => {
//     const reqConfig = {
//         method: httpRequest,
//         url,
//         data: reqBody,
//         headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
//     }

//     return await axios(reqConfig).then(
//         (result) => {
//             return result
//         }
//     ).catch((err) => {
//         return err
//     })
// }
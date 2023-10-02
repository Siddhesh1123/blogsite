import axios from 'axios';
import { App_notifications,SERVICE_URL } from '../constants/config';

const API_URL = 'http://localhost:2101';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'content-Type':"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess:true , data: response.data}
    }
    else {
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code : response?.code
         }
    }
}


const processError = (error) => {
    if (error.response) {
        //request made but server give response that is not in range of 2.x.x
        console.log("Error in Response", error.toJSON())
        return {
            isError: true,
            msg: App_notifications.responseFailure,
            code:error.response.status
        }
    } else if (error.request) {
        //request made but on response
         console.log("Error in Request", error.toJSON())
        return {
            isError: true,
            msg: App_notifications.responseFailure,
            code:""
        }
    } else {
        //ekde tu haglas
         console.log("Error in Network", error.toJSON())
        return {
            isError: true,
            msg: App_notifications.networkError,
            code:""
        }
    }
}

axiosInstance.interceptors.response.use(
    function (response) {
        //stop loader here
        return processResponse(response);
    },
    function (error) {
        //stop loader here
        return Promise.reject(processError(error))
    }
)

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }
        })
    }

export { API };
export const App_notifications = {
    loading: {
        tittle: 'Loading...',
        message:'Data is loading, pls wait'
    },
    sucess: {
        tittle: 'Sucess',
        message:'Data is loaded'
    },
    responseFailure: {
        tittle: 'Error',
        message:'An error occured while fetching ,try again later'
    },
    requestFailure: {
        tittle: 'Error',
        message:'An error occured while parsing data'
    },
    networkError: {
        tittle: 'Error',
        message:'check your net connection'
    }
}

//API SERVICE CALLS
//Need Service call :{ url :'/',method:'POST/GET/DELETE/PUT',params:'true/false',queery:'true/false'}

export const SERVICE_URL = {
    userSignup: {
        url: '/signup',
        method:'POST'
    },
    userLogin: {
        url: '/login',
        method: 'POST',
    },
    uploadFile: {
        url: '/file/upload',
        method : 'POST'
    }
}
// import React from 'react'
import axios from 'axios'
// import { axiosInstance } from 'axios';

export const axiosInstance = async (method , endpoint , payload) => {
    try{
        const response=  await axios({
            method,
            url : endpoint,
            data : payload,
            headers:{
                token : localStorage.getItem('token')
            },
        })
        return response.data

    }catch(error){
        return error 
    }
}



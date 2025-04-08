import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";




//register

export const signupUser = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/api/auth/register`,user,"")
}

//login

export const loginUser = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/api/auth/login`,user,"")
}



//getAllProducts

export const getAllProducts = async()=>{
    return await commonAPI("GET", `${BASE_URL}/api/products`,"","")
}

export const getProductById  = async(id)=> {
    return await commonAPI("GET", `${BASE_URL}/api/products/${id}`);

}
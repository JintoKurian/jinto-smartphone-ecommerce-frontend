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

//getUser cart items

export const getCartItems = async(userId, token)=>{
    return await commonAPI("GET", `${BASE_URL}/api/cart/user/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
}

// Update cart item quantity

export const updateCartItem = async (itemId,data, token) => {
    return await commonAPI("PUT",`${BASE_URL}/api/cart/update/${itemId}`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}

//Remove cart item

export const removeCartItem = async(itemId, token) => {
    return await commonAPI("DELETE", `${BASE_URL}/api/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
}






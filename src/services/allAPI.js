import { BASE_URL } from "./baseUrl";
import { commonAPI } from "./commonAPI";

// Register
export const signupUser = async (user) => {
  return await commonAPI("POST", `${BASE_URL}/api/auth/register`, user, "");
};

// Login
export const loginUser = async (user) => {
  return await commonAPI("POST", `${BASE_URL}/api/auth/login`, user, "");
};

// Get all products
export const getAllProducts = async () => {
  return await commonAPI("GET", `${BASE_URL}/api/products`, "", "");
};

// Get product by ID
export const getProductById = async (id) => {
  return await commonAPI("GET", `${BASE_URL}/api/products/${id}`, "", "");
};


// Add product to cart
export const addToCart = async (data, token) => {
  console.log(token);

  return await commonAPI(
    "POST",
    `${BASE_URL}/api/cart/add`,
    data,
    
      {
        Authorization: `Bearer ${token}`,
      }

  );
};


// Get user cart items
export const getCartItems = async (userId, token) => {
  console.log("Token:", token);
  return await commonAPI(
    "GET",
    `${BASE_URL}/api/cart/user/${userId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Update cart item quantity
export const updateCartItem = async (itemId, data, token) => {
  return await commonAPI(
    "PUT",
    `${BASE_URL}/api/cart/update/${itemId}`,
    data,
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

// Remove cart item
export const removeCartItem = async (itemId, token) => {
  return await commonAPI(
    "DELETE",
    `${BASE_URL}/api/cart/remove/${itemId}`,
    "",
    {
      Authorization: `Bearer ${token}`,
    }
  );
};

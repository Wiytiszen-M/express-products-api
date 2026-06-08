import request from "./client";

export const getProducts = () => {
  return request("/products");
};

export const createProduct = ({ name, price, category_id, token }) => {
  return request("/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      price,
      category_id,
    }),
  });
};

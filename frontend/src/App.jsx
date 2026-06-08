import { useEffect, useState, useCallback } from "react";
import { login } from "./api/authApi";
import { createProduct, getProducts } from "./api/productsApi";

function App() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category_id: "",
  });

  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [createProductError, setCreateProductError] = useState("");
  const [createProductSuccess, setCreateProductSuccess] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setIsLoadingProducts(true);
      setProductsError("");

      const response = await getProducts();

      setProducts(response.data);
      setMeta(response.meta);
    } catch (error) {
      setProductsError(error.message);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
    };

    fetchProducts();
  }, [loadProducts]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoggingIn(true);
      setLoginError("");

      const response = await login({
        email: loginForm.email,
        password: loginForm.password,
      });

      const loggedUser = response.data.user;
      const authToken = response.data.token;

      setUser(loggedUser);
      setToken(authToken);
      localStorage.setItem("token", authToken);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;

    setProductForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleCreateProductSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsCreatingProduct(true);
      setCreateProductError("");
      setCreateProductSuccess("");

      await createProduct({
        name: productForm.name,
        price: productForm.price,
        category_id: productForm.category_id,
        token,
      });

      setProductForm({
        name: "",
        price: "",
        category_id: "",
      });

      setCreateProductSuccess("Product created successfully");

      await loadProducts();
    } catch (error) {
      setCreateProductError(error.message);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  return (
    <main>
      <h1>Products App</h1>

      <section>
        <h2>Login</h2>

        {user ? (
          <div>
            <p>
              Logged in as <strong>{user.email}</strong> — role:{" "}
              <strong>{user.role}</strong>
            </p>

            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </div>

            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            {loginError && <p>Error: {loginError}</p>}
          </form>
        )}
      </section>

      {user?.role === "admin" && (
        <section>
          <h2>Create Product</h2>

          <form onSubmit={handleCreateProductSubmit}>
            <div>
              <label htmlFor="product-name">Name</label>
              <input
                id="product-name"
                name="name"
                type="text"
                value={productForm.name}
                onChange={handleProductChange}
              />
            </div>

            <div>
              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                name="price"
                type="number"
                value={productForm.price}
                onChange={handleProductChange}
              />
            </div>

            <div>
              <label htmlFor="product-category">Category ID</label>
              <input
                id="product-category"
                name="category_id"
                type="number"
                value={productForm.category_id}
                onChange={handleProductChange}
              />
            </div>

            <button type="submit" disabled={isCreatingProduct}>
              {isCreatingProduct ? "Creating..." : "Create product"}
            </button>

            {createProductError && <p>Error: {createProductError}</p>}
            {createProductSuccess && <p>{createProductSuccess}</p>}
          </form>
        </section>
      )}

      <section>
        <h2>Products</h2>

        {isLoadingProducts && <p>Loading products...</p>}

        {productsError && <p>Error: {productsError}</p>}

        {!isLoadingProducts && !productsError && (
          <>
            {meta && (
              <p>
                Page {meta.page} of {meta.totalPages} — Total products:{" "}
                {meta.totalItems}
              </p>
            )}

            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <strong>{product.name}</strong> — ${product.price} —{" "}
                  {product.category_name}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

export default App;

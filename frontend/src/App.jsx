import { useEffect, useState } from "react";
import { login } from "./api/authApi";
import { getProducts } from "./api/productsApi";

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

  useEffect(() => {
    const loadProducts = async () => {
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
    };

    loadProducts();
  }, []);

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

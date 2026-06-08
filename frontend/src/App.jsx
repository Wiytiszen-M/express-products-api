import { useEffect, useState } from "react";
import { getProducts } from "./api/productsApi";

function App() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getProducts();

        setProducts(response.data);
        setMeta(response.meta);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1>Products</h1>

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
    </main>
  );
}

export default App;

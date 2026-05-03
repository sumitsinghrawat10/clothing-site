import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useApp } from "../context/AppContext";

export default function PDP() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const { setCartCount } = useApp();

  return (
    <div>
      <h1>{product.name}</h1>

      <button onClick={() => setCartCount(c => c + 1)}>
        Add to Cart
      </button>
    </div>
  );
}
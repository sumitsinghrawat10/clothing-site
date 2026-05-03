import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { likedIds, toggleLike } = useApp();

  return (
    <div onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.images[0]} />

      <h3>{product.name}</h3>
      <p>{product.price}</p>

      <button onClick={(e) => {
        e.stopPropagation();
        toggleLike(product.id);
      }}>
        {likedIds.has(product.id) ? "♥" : "♡"}
      </button>
    </div>
  );
}
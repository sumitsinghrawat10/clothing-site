import { PRODUCTS } from "../data/products";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ProductGrid products={PRODUCTS} />
    </div>
  );
}
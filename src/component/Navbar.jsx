import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { cartCount } = useApp();

  return (
    <nav>
      <Link to="/">GLIMPEX</Link>

      <Link to="/shop">SHOP</Link>
      <Link to="/liked">LIKED</Link>
      <Link to="/new">NEW</Link>
      <Link to="/about">ABOUT</Link>

      <div>Cart ({cartCount})</div>
    </nav>
  );
}
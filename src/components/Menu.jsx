import { Link } from "react-router-dom";

const Menu = ({ horizontal = false }) => {
  return (
    <ul className={`menu ${horizontal ? "menu-horizontal px-1" : ""}`}>
      <li>
        <Link to="/products" className="text-black hover:underline">
          Products
        </Link>
      </li>
      <li>
        <Link to="/" className="text-black hover:underline">
          Dashboard
        </Link>
      </li>
    </ul>
  );
};

export default Menu;

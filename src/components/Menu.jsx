import { Link } from "react-router-dom";

const Menu = ({ horizontal = false }) => {
  return (
    <ul className={`menu ${horizontal ? "menu-horizontal px-1" : ""}`}>
      <li>
        <Link
          to="/products"
          className="text-sm/6 text-gray-950 dark:text-white hover:underline">
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-sm/6 text-gray-950 dark:text-white hover:underline">
          Dashboard
        </Link>
      </li>
    </ul>
  );
};

export default Menu;

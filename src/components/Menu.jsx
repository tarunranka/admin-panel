import { Link } from "react-router-dom";

const Menu = ({ horizontal = false }) => {
  return (
    <ul className={`menu ${horizontal ? "menu-horizontal px-1" : ""}`}>
      <li>
        <Link
          to="/"
          onClick={() =>
            (document.getElementById("menu-drawer").checked = false)
          }
          className="text-sm/6 text-gray-950 dark:text-white hover:underline">
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          onClick={() =>
            (document.getElementById("menu-drawer").checked = false)
          }
          className="text-sm/6 text-gray-950 dark:text-white hover:underline">
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/sales"
          onClick={() =>
            (document.getElementById("menu-drawer").checked = false)
          }
          className="text-sm/6 text-gray-950 dark:text-white hover:underline">
          Sales
        </Link>
      </li>
    </ul>
  );
};

export default Menu;

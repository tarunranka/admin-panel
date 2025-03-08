import { Link } from "react-router-dom";
import Menu from "./Menu";
import { useSelector, useDispatch } from "react-redux";

import { logoutAsync } from "../store/authSlice";

const MenuIcon = ({ htmlFor }) => (
  <label
    htmlFor={htmlFor}
    aria-label="open sidebar"
    className="btn btn-square btn-ghost">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 stroke-current">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </label>
);

const AvatarDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!user || !isAuthenticated) return null; // Ensure no unnecessary rendering

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar flex items-center justify-center">
        <div className="rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24"
            fill="none"
            stroke="#155dfc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user h-8 w-8 text-blue-600">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-3 w-48 p-2">
        <li>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition w-full text-left"
            onClick={() => dispatch(logoutAsync())}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div
      className="
  bg-base-100/90 text-base-content sticky top-0 z-30 flex h-16 w-full [transform:translate3d(0,0,0)] justify-center backdrop-blur transition-shadow duration-100 print:hidden
  shadow-xs
  ">
      <nav className="navbar p-6 w-full">
        {/* Mobile Menu Button */}
        <div className="flex-none lg:hidden">
          <MenuIcon htmlFor="my-drawer-3" />
        </div>
        {/* Logo Section */}
        <div className="flex flex-1 items-center md:gap-1 lg:gap-2">
          <Link to="/" className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-box h-8 w-8 text-blue-600">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
              <path d="m3.3 7 8.7 5 8.7-5"></path>
              <path d="M12 22V12"></path>
            </svg>
            <span className="ml-2 text-xl font-bold .text-base-content\/60">
              ERP
            </span>
          </Link>
        </div>
        {user && isAuthenticated ? (
          <>
            <div className="hidden lg:flex items-center gap-4">
              <Menu horizontal />
              <AvatarDropdown />
            </div>
            <div className="lg:hidden flex items-center">
              <AvatarDropdown />
            </div>
          </>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;

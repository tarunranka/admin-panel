import { Link } from "react-router-dom";
import Menu from "./Menu";

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
            viewBox="0 0 24 24"
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
          <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

const Navbar = () => {
  return (
    <div class="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
      <div class="bg-white dark:bg-gray-950">
        <nav className="navbar bg-white w-full">
          {/* Mobile Menu Button */}
          <div className="flex-none lg:hidden">
            <MenuIcon htmlFor="my-drawer-3" />
          </div>

          {/* Logo Section */}
          <div className="flex-1 px-2 mx-2 flex items-center">
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
                class="lucide lucide-box h-8 w-8 text-blue-600">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">ERP</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-4">
            <Menu horizontal />
            <AvatarDropdown />
          </div>

          {/* Mobile Avatar */}
          <div className="lg:hidden flex items-center">
            <AvatarDropdown />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

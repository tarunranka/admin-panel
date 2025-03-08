import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
      </div>
      <Sidebar />
    </div>
  );
};

export default Header;

import Menu from "./Menu";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-3"
        aria-label="close sidebar"
        className="drawer-overlay"></label>
      <div className="menu bg-base-200 min-h-full w-80 p-4">
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;

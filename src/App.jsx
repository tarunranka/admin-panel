import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginWithPassword from "./pages/LoginWithPassword";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginWithPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

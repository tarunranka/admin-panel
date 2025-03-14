import React, { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import LoginWithPassword from "./pages/LoginWithPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const shouldRender = useMemo(() => isAuthenticated, [isAuthenticated]);

  return shouldRender ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const shouldRender = useMemo(() => !isAuthenticated, [isAuthenticated]);

  return shouldRender ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginWithPassword />} />
              <Route path="/verify" element={<TwoFactorAuth />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/sales" element={<Sales />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

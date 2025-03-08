import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginWithPassword from "./pages/LoginWithPassword";
import Products from "./pages/Products";
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
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginWithPassword />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

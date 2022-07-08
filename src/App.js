import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
// import { store } from '../src/redux/store';
import HomePage from 'pages/store/home';
import Login from 'pages/home/login';
import ProductList from 'pages/store/product-list';
import ProfilePage from 'pages/store/profile';
import ProductDetail from 'pages/store/product-detail';
import BlogDetail from 'pages/store/blog-detail';
import CartContact from 'pages/store/cart-contact';
import Register from 'pages/home/register';
import ForgetPassword from 'pages/home/forget-password';
import ResetPassword from 'pages/home/reset-password';
import ChangePassword from 'pages/home/change-password';
import { Button } from 'antd';
import OrderList from 'pages/store/order-list';
import Cart from 'pages/store/cart';
import InformationOrder from 'pages/store/information-order';
import StoreLayoutContainer from 'layouts/store/store.layout';
import ProtectedRoute from 'components/protected-route';
import store, { persistor } from 'redux/rtkStore';
import { PersistGate } from 'redux-persist/integration/react';
import DashboardSider from 'layouts/dashboard/dashboard.sider';
import ManageProductList from 'pages/dashboard/products/product-list.container';
import DashboardLayout from 'layouts/dashboard/dashboard.layout';
import ManagePostList from 'pages/dashboard/posts/post-list.container';
import BlogList from 'pages/store/blog';
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <>
      {/* <HomePage /> */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StoreLayoutContainer />}>
            //Public route
              {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/product-list/:id" element={<ProductList />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/blog-detail" element={<BlogDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart-contact" element={<CartContact />} />
              {/* </Route> */}
            //Protected route
              {/* <Route element={<ProtectedRoute allowed={['customer']} />}> */}
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/information-order" element={<InformationOrder />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/blog" element={<BlogList />} />
            </Route>
            {/* </Route> */}
          </Routes>

          <Routes>
            <Route path="/login" element={<Login />} />
            {role === 'R03' && (
              <Route
                path="dashboard"
                element={
                  <DashboardLayout sider={<DashboardSider />} title="Admin" />
                }
              >
                <Route path="product" element={<ManageProductList />} />
                <Route path="customer" element={<ManageProductList />} />
                <Route path="order" element={<ManageProductList />} />
                <Route path="post" element={<ManagePostList />} />
              </Route>
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </>
  );
};

export default AppWrapper;

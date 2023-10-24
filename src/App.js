import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';
import axios from 'axios';
function App() {

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // disable right click
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });

  const [server, setServer] = useState(false)
  useEffect(() => {
    //check server status
    axios.get("https://kiettran.azurewebsites.net/").then(
      (response) => {
        if (response.status === 200) {
          setServer(true)
        }
      },
      (error) => {

        setServer(false)

      }
    )
  }, [])
  return (
    <>
      {!server ?
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        :
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />

            <Route path="/cart" element={<Cart />} />

            {/* order process */}
            <Route path="/shipping" element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            } ></Route>

            <Route path="/order/confirm" element={
              <ProtectedRoute>
                <OrderConfirm />
              </ProtectedRoute>
            } ></Route>

            <Route path="/process/payment" element={
              <ProtectedRoute>
                {/* // stripeApiKey && ( */}
                {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
                <Payment />
                {/* // </Elements> */}
                {/* ) */}
              </ProtectedRoute>
            } ></Route>

            <Route path="/orders/success" element={<OrderSuccess success={true} />} />
            <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
            {/* order process */}

            <Route path="/order/:id" element={
              <ProtectedRoute>
                <OrderStatus />
              </ProtectedRoute>
            } ></Route>

            <Route path="/orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }></Route>

            <Route path="/order_details/:id" element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }></Route>

            <Route path="/account" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } ></Route>

            <Route path="/account/update" element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            } ></Route>

            <Route path="/password/update" element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            } ></Route>

            <Route path="/password/forgot" element={<ForgotPassword />} />

            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/dashboard" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={0}>
                  <MainData />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/orders" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={1}>
                  <OrderTable />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/order/:id" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={1}>
                  <UpdateOrder />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/products" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={2}>
                  <ProductTable />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/new_product" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={3}>
                  <NewProduct />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/product/:id" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={2}>
                  <UpdateProduct />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/users" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={4}>
                  <UserTable />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/user/:id" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={4}>
                  <UpdateUser />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="/admin/reviews" element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard activeTab={5}>
                  <ReviewsTable />
                </Dashboard>
              </ProtectedRoute>
            } ></Route>

            <Route path="*" element={<NotFound />}></Route>

          </Routes>
          <Footer />
        </>
      }
    </>
  );
}

export default App;

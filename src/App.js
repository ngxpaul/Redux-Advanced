import { useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";
import { useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
 let initialStart = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    const sendCartData = async () => {
      //remember that create firebase database in "test mode" to allow read and write
      const response = await fetch(
        "https://react-cdec5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Seding cart data failed");
      }
      //PUT >< POST -> PUT : new data will not be added in a list of data -> it will override the existing data
      const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sending cart data successfully!",
        })
      );
    };
    if (initialStart) {
      initialStart = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error...",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

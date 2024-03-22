import { useSelector } from "react-redux";
import { uiActions } from "./ui-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
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
      if(!response.ok){
        dispatch(
          uiActions.showNotification({
            status: "Error",
            title: "Error...",
            message: "Sending cart data failed!",
          })
        );
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
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

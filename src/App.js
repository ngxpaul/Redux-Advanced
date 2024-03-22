import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    //remember that create firebase database in "test mode" to allow read and write
    fetch('https://react-cdec5-default-rtdb.firebaseio.com/cart.json', {
      method: "PUT",
      body: JSON.stringify(cart),
    });
    //PUT >< POST -> PUT : new data will not be added in a list of data -> it will override the existing data

  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

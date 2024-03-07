import classes from "./CartButton.module.css";
import { useDispatch , useSelector} from "react-redux";
import  {uiActions}  from "../store/ui-slice";
const CartButton = (props) => {
  const dispatch = useDispatch();
  const quantityItem = useSelector(state => state.cart.totalQuantity);
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantityItem}</span>
    </button>
  );
};

export default CartButton;

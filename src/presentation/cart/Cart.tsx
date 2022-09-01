import { useSelector } from "react-redux";
import { CartViewModel } from "./cart.viewmodel";

export const Cart = ({ cartViewModel }: { cartViewModel: CartViewModel }) => {
  const cartState = useSelector(cartViewModel.selector);

  return (
    <div>
      <h2>My Cart</h2>
      <ul>
        {cartState.products.map((p) => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <h4>
              <strong>{p.price}</strong>
              <span style={{ color: "red" }}>{p.quantity}</span>
            </h4>
          </li>
        ))}
      </ul>
      <h3>Total: {cartState.total}</h3>
    </div>
  );
};

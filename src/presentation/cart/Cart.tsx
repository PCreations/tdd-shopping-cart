import { useEffect, useState } from "react";
import { CartViewData, CartViewModel } from "./cart.viewmodel";

export const Cart = ({ cartViewModel }: { cartViewModel: CartViewModel }) => {
  const [cartState, setCartState] = useState<CartViewData>();

  useEffect(
    () => cartViewModel.subscribe((data) => setCartState(data)),
    [cartViewModel]
  );

  return (
    <div>
      <h2>My Cart</h2>
      <ul>
        {cartState?.products.map((p) => (
          <li key={p.id}>
            <h3>{p.name}</h3>
            <h4>
              <strong>{p.price}</strong>
              <span style={{ color: "red" }}>{p.quantity}</span>
            </h4>
          </li>
        ))}
      </ul>
      <h3>Total: {cartState?.total}</h3>
    </div>
  );
};

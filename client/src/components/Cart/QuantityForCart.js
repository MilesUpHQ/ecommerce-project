import "./QuantityPicker.css";
export default function QuantityForCart(props, cart) {
  return props.isCart ? (
    <td className="border-0 align-middle input-quantity">
      <span className="quantity-picker">
        <button
          className="quantity-modifier modifier-left"
          onClick={() => props.decrement(cart.cart_id)}
        >
          &ndash;
        </button>
        <input
          type="number"
          className=" quantity-display"
          value={cart.quantity}
          required
          onChange={(e) => props.updateItem(cart.cart_id, e.target.value)}
        />
        <button
          className="quantity-modifier modifier-right"
          onClick={() => props.increment(cart.cart_id)}
        >
          &#xff0b;
        </button>
      </span>
    </td>
  ) : null;
}

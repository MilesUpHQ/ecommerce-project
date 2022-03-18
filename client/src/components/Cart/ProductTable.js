import React from "react";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ProductTable(props) {
  return (
    <div className="row">
      <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="border-0 bg-light">
                  <div className="p-2 px-3 text-uppercase">Product</div>
                </th>
                <th scope="col" className="border-0 bg-light">
                  <div className="py-2 text-uppercase">Price</div>
                </th>
                {props.isCart ? (
                  <th scope="col" className="border-0 bg-light">
                    <div className="py-2 text-uppercase">Quantity</div>
                  </th>
                ) : null}
                <th scope="col" className="border-0 bg-light">
                  <div className="py-2 text-uppercase">Remove</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {props.cartItems.map((cart) => (
                <tr key={cart.cart_id}>
                  <th scope="row" className="border-0">
                    <div className="p-2">
                      <img
                        src={BASE_URL + "/" + cart.image_url}
                        alt="product"
                        width="70"
                        className="img-fluid rounded shadow-sm"
                      />
                      <div className="ml-3 d-inline-block align-middle">
                        <h5 className="mb-0">
                          <a
                            href={`/product/view/${cart.id}`}
                            className="text-dark d-inline-block align-middle"
                          >
                            {cart.name}
                          </a>
                        </h5>
                      </div>
                    </div>
                  </th>
                  <td className="border-0 align-middle">
                    <strong>₹{cart.price}</strong>
                  </td>
                  {props.isCart ? (
                    <td className="border-0 align-middle input-quantity">
                      <input
                        type="number"
                        className="form-control"
                        value={cart.quantity}
                        required
                        onChange={(e) =>
                          props.updateItem(cart.cart_id, e.target.value)
                        }
                      />
                    </td>
                  ) : null}

                  <td className="border-0 align-middle">
                    {props.isCart ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => props.deleteItem(cart.cart_id)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => props.deleteItem(cart.wishlist_id)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

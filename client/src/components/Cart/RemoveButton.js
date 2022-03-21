import React from "react";

export default function RemoveButton(props) {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger"
      onClick={() => props.deleteItem(props.id)}
    >
      Remove
    </button>
  );
}

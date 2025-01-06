import React from "react";

function Cart({item}) {
  return (
    <button type="button" class="btn btn-primary position-relative">
      Cart
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {item}
        <span class="visually-hidden">unread messages</span>
      </span>
    </button>
  );
}

export default Cart;

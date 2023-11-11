import React, { FunctionComponent } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { CartItemComponent } from ".";
import { formatCurrencies } from "../utils";
import storeItems from "../data/items.json";

declare interface IShoppingCartCanvas {
  isOpen: boolean;
  cartItems: ICartItem[];
  handleCloseCart: () => void;
}
export const ShoppingCartCanvas: FunctionComponent<IShoppingCartCanvas> = ({
  isOpen,
  handleCloseCart,
  cartItems,
}: IShoppingCartCanvas) => {
  const totalAccumulator = cartItems.reduce((accumulator, eachItem) => {
    const item = storeItems.find((item) => item.id === eachItem.id);
    return accumulator + (item?.price || 0) * eachItem.quantity;
  }, 0);
  return (
    <Offcanvas show={isOpen} placement="end" onHide={handleCloseCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.length > 0
            ? cartItems.map((cartItem) => {
                return <CartItemComponent key={cartItem.id} {...cartItem} />;
              })
            : null}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrencies(totalAccumulator)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

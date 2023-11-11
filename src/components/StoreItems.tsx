import React, { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrencies } from "../utils";

import { ENGLISH } from "../constant/Language";

const { CART } = ENGLISH;

interface IStoreItemsProps {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
}
export const StoreItems: FunctionComponent<IStoreItemsProps> = ({
  id,
  name,
  price,
  quantity,
  imgUrl,
}: IStoreItemsProps) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrencies(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100">{CART.ADD_TO_CART}</Button>
          ) : null}
          {quantity !== 0 ? (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                  {CART.IN_CART}
                </div>
                <Button>+</Button>
              </div>
              <Button variant="danger" size="sm">
                {CART.REMOVE_CART_BUTTON}
              </Button>
            </div>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

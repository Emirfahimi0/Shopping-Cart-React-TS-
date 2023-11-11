import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrencies } from "../utils";

import { ENGLISH } from "../constant/Language";
import { useShoppingCart } from "../context";

const { CART } = ENGLISH;

interface IStoreItemsProps {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
  eachCartQuantity: number;
}
export const StoreItems: FunctionComponent<IStoreItemsProps> = ({
  id,
  name,
  price,
  eachCartQuantity,
  imgUrl,
}: IStoreItemsProps) => {
  const { decreaseCartQuantity, increaseCartQuantity, removeFromCart } =
    useShoppingCart();

  return (
    <Card key={id}>
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
          {eachCartQuantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              {CART.ADD_TO_CART}
            </Button>
          ) : null}
          {eachCartQuantity !== 0 ? (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button
                  style={{ fontSize: 12 }}
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </Button>
                <div>
                  <span className="fs-5">{eachCartQuantity}</span>
                </div>
                <Button
                  style={{ fontSize: 12 }}
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                {CART.REMOVE_CART_BUTTON}
              </Button>
            </div>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

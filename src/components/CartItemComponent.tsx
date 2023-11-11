import { CSSProperties, Fragment } from "react";
import { useShoppingCart } from "../context";
import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrencies } from "../utils";

declare interface ICartItemComponentProps {
  id: number;
  quantity: number;
}
export const CartItemComponent = ({
  id,
  quantity,
}: ICartItemComponentProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);

  const imgBox: CSSProperties = {
    width: "125px",
    height: "75px",
    objectFit: "cover",
  };
  return (
    <Fragment>
      {item !== undefined ? (
        <Stack
          direction="horizontal"
          gap={2}
          className="d-flex align-items-center"
        >
          <img src={item.imgUrl} style={imgBox} />
          <div className="me-auto">
            <div>
              {item.name}
              {quantity > 1 ? (
                <span
                  className="text-muted"
                  style={{ fontSize: ".65rem", paddingLeft: 4 }}
                >
                  x{quantity}
                </span>
              ) : null}
            </div>
            <div className="text-muted" style={{ fontSize: ".75rem" }}>
              {formatCurrencies(item.price)}
            </div>
          </div>
          <div>{formatCurrencies(item.price * quantity)}</div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(item.id)}
          >
            &times;
          </Button>
        </Stack>
      ) : null}
    </Fragment>
  );
};

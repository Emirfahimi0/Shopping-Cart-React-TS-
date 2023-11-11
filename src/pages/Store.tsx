import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { FunctionComponent } from "react";
import { StoreItems } from "../components";

export const Store: FunctionComponent = () => {
  return (
    <div>
      <h1>Store</h1>
      <Row md={5} xs={1} lg={3} className="g-3">
        {storeItems.map((eachItems: IStoreItems) => {
          return (
            <Col key={eachItems.id}>
              <StoreItems quantity={1} {...eachItems} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

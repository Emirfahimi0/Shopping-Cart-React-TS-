import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCartCanvas } from "../components";

type TypeShoppingCartProvider = {
  children: ReactNode;
};

declare interface IShoppingCartContext {
  cartItems: ICartItem[];
  cartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  decreaseCartQuantity: (id: number) => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

declare interface ICartItem {
  id: number;
  quantity: number;
}
const shoppingCartContext = createContext({} as IShoppingCartContext);

export const useShoppingCart = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(shoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: TypeShoppingCartProvider) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (accumulator, item) => item.quantity + accumulator,
    0
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);

      if (existingItem === undefined) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item.id === id);

      if (existingItem?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };
  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCartCanvas
        isOpen={isOpen}
        handleCloseCart={closeCart}
        cartItems={cartItems}
      />
    </shoppingCartContext.Provider>
  );
};

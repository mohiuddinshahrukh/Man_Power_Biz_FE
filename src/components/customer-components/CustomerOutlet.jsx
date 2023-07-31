import { Outlet } from "react-router-dom";
import { MainNavbarComponent } from "../navbar/MainNavbarComponent";
import { MainFooterComponent } from "../navbar/MainFooterComponent";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useState } from "react";
import { useEffect } from "react";

const CustomerOutlet = () => {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  console.log("Shopping cart items: ", shoppingCartItems);
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCartItems");
    if (storedCart) {
      setShoppingCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "shoppingCartItems",
      JSON.stringify(shoppingCartItems)
    );
  }, [shoppingCartItems]);
  const cartTotal = shoppingCartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartItems, setShoppingCartItems, cartTotal }}
    >
      <MainNavbarComponent />
      <Outlet />
      <MainFooterComponent />
    </ShoppingCartContext.Provider>
  );
};

export default CustomerOutlet;

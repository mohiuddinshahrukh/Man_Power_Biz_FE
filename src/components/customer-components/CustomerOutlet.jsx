import { Outlet } from "react-router-dom";
import { MainNavbarComponent } from "../navbar/MainNavbarComponent";
import { MainFooterComponent } from "../navbar/MainFooterComponent";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useState } from "react";

const CustomerOutlet = () => {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  console.log("Shopping cart items: ", shoppingCartItems);
  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartItems, setShoppingCartItems }}
    >
      <MainNavbarComponent />
      <Outlet />
      <MainFooterComponent />
    </ShoppingCartContext.Provider>
  );
};

export default CustomerOutlet;

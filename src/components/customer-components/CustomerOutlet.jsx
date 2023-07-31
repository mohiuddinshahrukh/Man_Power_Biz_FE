import { Outlet } from "react-router-dom";
import { MainNavbarComponent } from "../navbar/MainNavbarComponent";
import { MainFooterComponent } from "../navbar/MainFooterComponent";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { useState } from "react";
import { useEffect } from "react";
import { UserProfileContext } from "../../contexts/userProfileContext";

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
  let taxTotal = 0;
  function calculateTotalWithTaxes(cartTotal, taxRate) {
    // Calculate the tax amount
    const taxAmount = (taxRate / 100) * cartTotal;
    taxTotal = taxAmount;
    // Calculate the total amount including taxes
    const totalAmountWithTaxes = cartTotal + taxAmount;

    return totalAmountWithTaxes;
  }
  // Set the tax rate based on your specific case
  const taxRate = 18; // Assuming the tax rate is 18%

  // Calculate the total amount including taxes
  const totalAmountWithTaxes = calculateTotalWithTaxes(cartTotal, taxRate);

  // User context
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  useEffect(() => {
    const loggedInCustomer = localStorage.getItem("customerDetails");
    if (loggedInCustomer) {
      setLoggedInUserDetails(JSON.parse(loggedInCustomer));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "customerDetails",
      JSON.stringify(loggedInUserDetails)
    );
  }, [loggedInUserDetails]);
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartItems,
        setShoppingCartItems,
        cartTotal,
        taxTotal,
        totalAmountWithTaxes,
      }}
    >
      <UserProfileContext.Provider
        value={{ loggedInUserDetails, setLoggedInUserDetails }}
      >
        <MainNavbarComponent />
        <Outlet />
        <MainFooterComponent />
      </UserProfileContext.Provider>
    </ShoppingCartContext.Provider>
  );
};

export default CustomerOutlet;

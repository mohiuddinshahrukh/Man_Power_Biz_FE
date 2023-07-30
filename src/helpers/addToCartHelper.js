export const addToCart = (
  cartItems,
  item,
  setCartItems,
  refresh,
  setRefresh
) => {
  console.log("Cart function called");
  console.log("cartItems", cartItems);
  if (cartItems.length > 0) {
    cartItems.filter((cartItem) => {
      console.log("cart item: ", cartItem);
      if (cartItem._id == item._id) {
        cartItem.quantity++;
        cartItem.price += item.packagePrice;
        setRefresh(!refresh);
      } else {
        item.quantity = 1;

        setCartItems((prevItems) => [...prevItems, item]);
      }
    });
  } else {
    item.price = item.packagePrice;
    item.quantity = 1;
    setRefresh(!refresh);
    setCartItems((prevItems) => [...prevItems, item]);
  }
};

export const removeFromCart = (
  cartItems,
  item,
  setCartItems,
  refresh,
  setRefresh
) => {
  if (cartItems.length > 0) {
    cartItems.filter((cartItem) => {
      console.log("cart item: ", cartItem);
      if (cartItem._id == item._id) {
        cartItem.quantity--;
        cartItem.price -= item.packagePrice;
        setRefresh(!refresh);
      } else {
        item.quantity = 1;
        setCartItems((prevItems) => [...prevItems, item]);
      }
    });
  }

  setCartItems((prevItems) =>
    prevItems.filter((cartItem) => {
      if (!cartItem.quantity <= 0) {
        return cartItem;
      }
    })
  );
};

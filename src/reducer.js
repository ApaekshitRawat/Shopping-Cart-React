const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((list) => list.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((list) => {
      if (list.id === action.payload) {
        return {
          ...list,
          amount: list.amount + 1,
        };
      }
      return list;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((list) => {
        if (list.id === action.payload) {
          return {
            ...list,
            amount: list.amount - 1,
          };
        }
        return list;
      })
      .filter((list) => list.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    let tempTotal = 0;
    let tempAmount = 0;
    state.cart.map((item) => {
      const { price, amount } = item;
      tempTotal += price * amount;
      tempAmount += amount;
      return 0;
    });
    return {
      ...state,
      total: parseFloat(tempTotal.toFixed(2)),
      amount: tempAmount,
    };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;

import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: Array.isArray(JSON.parse(localStorage.getItem("cart")))
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      console.log("action payload of cart : ");

      const product = action.payload;

      if (!Array.isArray(state.cart)) {
        state.cart = []; // Reset to empty array if cart is not an array
      }

      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload; // The ID of the product to remove
      const existingProduct = state.cart.find((item) => item.id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Decrease the quantity by 1
          existingProduct.quantity -= 1;
        } else {
          // Remove the product from the cart if quantity reaches 0
          state.cart = state.cart.filter((item) => item.id !== productId);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = action.payload; // Contains the address and possibly other data
      state.orders.push(newOrder);
    },
    initializeTodos: (state, action) => {
      state.orders = action.payload;
    },
  },
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todo: [],
  },
  reducers: {
    addTodos: (state, action) => {
      state.todo.push(action.payload);
    },
    removeTodos: (state, action) => {
      state.todo = state.todo.filter((item) => {
        return item.id !== action.payload;
      });
    },
    updateTodos: (state, action) => {
      console.log(action.payload);
      state.todo = state.todo.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    initializeTodos: (state, action) => {
      state.todo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    carts: cartSlice.reducer,
    orders: orderSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.carts.cart));
});

export const todosAction = todoSlice.actions;
export const cartAction = cartSlice.actions;
export const orderAction = orderSlice.actions;

export default store;

import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart : JSON.parse(localStorage.getItem("cart")) || {}
  },
  reducers: {
    addItem: (state, action) => {
      if (state.cart[action.payload]) {
        state.cart[action.payload]++;
      } else {
        state.cart[action.payload]=1;
      }
    },
    removeItem: (state,action) => {
        
        if (state.cart[action.payload]>1) {
            state.cart[action.payload]--;
          } else {
            delete state.cart[action.payload]
          }
    },
    clearCart: (state) => {
      state.cart = {}; 
    },
  },
});


const orderSlice = createSlice({
  name: "orders",
  initialState : {
    orders: []
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
  reducer: { todos: todoSlice.reducer, carts: cartSlice.reducer, orders : orderSlice.reducer },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.carts.cart));
  });

export const todosAction = todoSlice.actions;
export const cartAction = cartSlice.actions;
export const orderAction = orderSlice.actions;


export default store;

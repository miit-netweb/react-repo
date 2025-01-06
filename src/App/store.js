import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
    todo:[]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
       addTodos: (state,action) => {
          state.todo.push(action.payload)
       },
       removeTodos: (state,action) => {
          state.todo = state.todo.filter(item => {
              return item.id !== action.payload
          })
       },
       updateTodos: (state,action) => {
        console.log(action.payload)
         state.todo = state.todo.map(item => {
            if(item.id === action.payload.id){
                return action.payload
            } else {
                return item
            }
         })
       },
       initializeTodos: (state,action) => {
            state.todo = action.payload;
       }
    },
  });


  const store = configureStore({
    reducer: { todos:todoSlice.reducer },
  });


  export const todosAction = todoSlice.actions;
  export default store;

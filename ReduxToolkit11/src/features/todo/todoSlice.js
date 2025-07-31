import { createSlice , nanoid } from "@reduxjs/toolkit";

const initState= {
    todos : [{id:1 , text : "Hello World"}]
}

function sayHello (){
    console.log("Hello World")
}
export const todoSlice = createSlice({
    name :'todo' , 
    initState,
    reducers:{
        addTodo:(state , action)=>{
         const todo ={
            id:nanoid(),
            text:action.payload
         }
         state.todos.push(todo)
        },
        removeTodo :(state ,action)=>{
        state.todos=state.todos.filter((todo =>todo))
        }
    }
})
export const {addTodo , removeTodo} =todoSlice.actions

export default todoSlice.reducer
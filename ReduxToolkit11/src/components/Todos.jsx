import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
    const todos = useSelector((state)=>state.Todos)
    const dispatch =useDispatch()
  return (
    <>
    <div>Todos</div>
    {todos.map((todo)=>(
        <li key={todo.id}>
        {todo.text}
        <button onClick={()=> dispatch(removeTodo(todo.id))}>
            
        </button>
        </li>
    ))}
    </>
    
  )
}

export default Todos
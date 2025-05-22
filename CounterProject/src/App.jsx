import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {
 let [counter , set] = useState(0)
  // let counter = 5;
  let addValue =()=>{
    
    console.log("Clicked" , counter );
    if(counter >='20'){
      alert('Only Will increase upto 20')
    }
    else{
set(counter + 1)

    }
    
  }
  let removeValue =()=> {
    
    console.log("clicked" , counter);
    if(counter <='0'){
   alert('Only Will decrease upto 0')
   
    }
    else{
set(counter - 1)
    }
  }
  return (
    <>
    <h2>Ujjwal Mishra</h2>
    <h3>Counter Value : {counter}</h3>

    <button onClick={addValue}>Add Value : {counter}</button>
    <br />
    <button onClick={removeValue}>Remove Value : {counter}</button>
    </>
  )
}

export default App


import { useState } from 'react'
import ToDo from './components/ToDo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <ToDo/>
      </div> 
    </>
  )
}

export default App

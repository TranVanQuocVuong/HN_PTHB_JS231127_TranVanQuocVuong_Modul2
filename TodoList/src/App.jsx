import React from 'react'
import ToDoList from './components/ToDoList'

export default function App() {
  return (
    <div style={{height:"90vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <ToDoList></ToDoList>
    </div>
  )
}

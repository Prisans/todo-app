import React, { useEffect, useState } from 'react'
import axios from "axios"

const Todo = () => {
    const API_URL = "http://localhost:8080/api/todos"
    const [todoData,setTodoData] = useState([])
    const [todoInput,setTodoInput] = useState("")


    async function handleClick(){
            try{
                let trimmedValue = todoInput.trim()
                if(trimmedValue.length === 0) return
                const response = await axios.post(API_URL , {title : trimmedValue})
                // console.log("sent response" , response.data)
                setTodoInput("")
                setTodoData(prev=>(
                   [...prev,response.data.data]
                ))
            }catch(error){
                console.log(error)
            }

    }

    async function getTodos(){
        try{
            const response = await axios.get(API_URL)
            setTodoData(response.data.data)
        }catch(error){
            console.log(error)
        }
    }

    // console.log("todo data is",todoData)

    useEffect(()=>{
        getTodos()
    },[])
  return (
    <div>
        <input value={todoInput} type="text" onChange={(e)=>setTodoInput(e.target.value)} placeholder='enter todo here...'/>
        <button onClick={handleClick} >add todo</button>
        {
            todoData.map(todo=>{
                return (
                    <li key={todo._id} >{todo.title}</li>
                )
            })
        }
    </div>
  )
}

export default Todo
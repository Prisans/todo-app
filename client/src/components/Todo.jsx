import React, { useEffect, useState } from 'react'
import axios from "axios"

const Todo = () => {
    const API_URL = "http://localhost:8080/api/todos"
    const [todoData,setTodoData] = useState([])
    const [todoInput,setTodoInput] = useState("")
    const [todoId,setTodoId] = useState(null)
    const [editInput,setEditInput] = useState("")
    // const [updateTodo,setUpdateTodo] = useState({
    //     title : "",
    //     isUpdated : true
    // })


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

            // getTodos()

    }

    // deleting todos
    async function handleDelete(id){
        try{
            if(!id) return 
            const deletedTodo = await axios.delete(`${API_URL}/${id}`)
            setTodoData(prev=>prev.filter((item)=>item._id !=id))
            // console.log("successfully deleted" , deletedTodo.data)
            console.log("deleted todo" , todoData)
        }catch(error){
            console.log(error)
        }
    }

    // reading

    async function getTodos(){
        try{
            const response = await axios.get(API_URL)
            setTodoData(response.data.data)
        }catch(error){
            console.log(error)
        }
    }

    // update todo

    async function handleUpdate(id){
       try{
            setShowUpdate(prev=>!prev)
            setTodoId(id)

           const updatedTodo = await axios.patch(`${API_URL}/${id}` , {title : editInput, completed : true})
           setTodoData(prev=>prev.map(item=>item._id === id ? updatedTodo.data.data : item))
           setEditInput("")
           setTodoId(null)
           console.log("data updated successfully" , updatedTodo)

       }catch(error){
            console.log("server error")
       }
    }

    // console.log("todo data is",todoData)

    useEffect(()=>{
        getTodos()
    },[])
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
            
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Todo App
            </h1>
      
            {/* Add Todo Section */}
            <div className="flex gap-2 mb-6">
              <input
                value={todoInput}
                type="text"
                onChange={(e)=>setTodoInput(e.target.value)}
                placeholder="Enter todo here..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add
              </button>
            </div>
      
            {/* Todo List */}
            <ul className="space-y-3">
              {todoData.map(todo => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
                >
                  <div className="flex-1">
                    <p className="text-gray-800">{todo.title}</p>
      
                    {todoId === todo._id && (
                      <input
                        value={editInput}
                        onChange={(e)=>setEditInput(e.target.value)}
                        type="text"
                        placeholder="Update your todo..."
                        className="mt-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                    )}
                  </div>
      
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={()=>handleUpdate(todo._id)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                    >
                      Update
                    </button>
      
                    <button
                      onClick={()=>handleDelete(todo._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
      
          </div>
        </div>
      );
}

export default Todo
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])

  useEffect(()=>{
     let todoString=localStorage.getItem("todos")
     if(todoString)
     {
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
     }
  },[])
  const saveTodos=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(item=>item.id===id)
    setTodo(t[0].todo)

    let newTodos=todos.filter(item=>{
      return item.id!==id
    });

    setTodos(newTodos)
    saveTodos()

  }

  const handleDelete=(e,id)=>{
    confirm("Do you want to delete ???")
    let newtodos=todos.filter(item =>{
        return item.id!=id;
    });
   
     setTodos(newtodos)
     saveTodos()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")

    saveTodos()
  }

  const handleChange=(e)=>{
      setTodo(e.target.value)

  }
  const handleCheckbox =(e)=>{
     let id= e.target.name
     let index=todos.findIndex(item=>{
        return item.id==id;
     })
     let newtodos=[...todos];
     newtodos[index].isCompleted=!newtodos[index].isCompleted;
     setTodos(newtodos)
     saveTodos()
  }
  
  return (
    <>
      <Navbar />
      <div className="container relative left-1/4 my-5 w-1/2 rounded-xl py-5 bg-violet-100 min-h-[80] shadow-2xl ">
      <div className="addtodos my-5">
          <h2 className="text-lg font-bold m-2 ">Add a todos</h2>
          <input onChange={handleChange} value={todo} type="text " className="w-80 rounded-2xl h-9 shadow-lg text-center"/>
          <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 py-1 rounded-md mx-10">Add Task</button>
          
        </div>
        <h2 className="text-lg font-bold  ">Your Todos</h2>

       
        <div className="todos">
          {todos.map (item =>{

        
       return <div  key={item.id} className="todo flex justify-between w-1/2 my-3">
           <input onChange={handleCheckbox} type="checkbox" value={item.isCompleted}  name={item.id} id=""  />
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}}className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 py-1 rounded-md mx-2 "><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}}className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 py-1 rounded-md mx-2 "><MdDeleteForever /></button>
          </div>
        </div>
})}
        </div>
       
      </div>
    </>
  );
}

export default App;

import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
    const handleEdit = (e,id)=>{
      let t = todos.filter(i=>i.id === id)
        setTodo(t[0].todo); 
        let newTodos = todos.filter(item=>{ return item.id !== id
        });
        setTodos(newTodos);
        saveToLS();
    }
    const handleDelete = (e,id)=>{
       let newTodos = todos.filter(item=>{ return item.id !== id
       });
       setTodos(newTodos);
       saveToLS();
    }
    const handleAdd = ()=>{
      if (!todo.trim()) {
        alert("Please enter something");
        return;
      }
          setTodos([...todos,{id:uuidv4(),todo, isCompleted: false}])
          setTodo("");
          saveToLS();
          
    }

    const handleChange = (e) =>{
      setTodo(e.target.value)
    }

   const handleCheckbox = (e) => {
     let id = e.target.name;
     let index = todos.findIndex(item =>{
      return item.id === id;
     })
     
     let newTodos = [...todos];
     newTodos[index].isCompleted =  !newTodos[index].isCompleted;
     setTodos(newTodos)
     saveToLS();
   }

   useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
     let todos = JSON.parse(localStorage.getItem("todos"));
     setTodos(todos)
   }
   }, [])
   
   const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
   }
   
  const toggleFinished = (e) => {
      setshowFinished(!showFinished);
  }
  
  
  return (
    <div>
      <Navbar/>

      <div className="container bg-violet-100 mx-auto my-5 rounded-xl p-4 min-h-[80vh] shadow-2xl">
  <h1 className="text-2xl font-bold text-center text-violet-700 mb-4">Add Your Todos</h1>
  <div className="add flex gap-2 mb-5">
    <input onChange={handleChange} value={todo}
      type="text" 
      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400" 
      placeholder="Enter your todo here..." 
    />
    <button onClick={handleAdd}
      className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-all shadow-md"
    >
      Add
    </button>
  </div>
  
    <div className='showFinished flex gap-5'>
    <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="" />
    <label htmlFor="showSaved" className='text-lg font-bold text-green-500'>Show saved Todos</label>
    </div>
    <h1 className='h-[1px] bg-black w-3/4 m-auto opacity-50 my-2'></h1>
  <h1 className="text-2xl font-bold text-center text-violet-700 mb-4">Your Todos</h1>
  <div className="todos space-y-4">

    {todos.length === 0 && <div className='text-center text-2xl'>NO Todos to Display</div> }
    {todos.map(item=>{ 

    return (showFinished || !item.isCompleted) && <div key = {item.id} className="todo bg-white p-4  rounded-lg shadow-md gap-5 flex justify-between items-start ">
      <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} />
      <div className={item.isCompleted?"line-through":""}>
          {item.todo}
      </div>
      <div className="buttons flex gap-2">
        <button onClick={(e)=>{handleEdit(e,item.id)}}
          className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition-all shadow-sm"
        >
          <FaEdit />
        </button>
        <button onClick={(e)=>{handleDelete(e,item.id)}}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all shadow-sm"
        >
         <MdDelete />
        </button>
      </div>
    </div>
    })}
  </div>
</div>
    </div>
  )
}

export default App
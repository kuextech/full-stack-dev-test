import React, { useEffect, useState }  from 'react';
import './App.css';

import { BiCheckCircle, BiTrash } from "react-icons/bi";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}


function App() {

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filteredTodos, setfilteredTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('active');

  const getTabClass = (tab: string) => {
    return activeTab === tab ? 'text-xs p-2 border border-gray-200 bg-white w-40 rounded-md' : 'text-xs p-2 border border-transparent w-40';
  };


  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key !== 'Enter') {
      return
    }
    
    if (newTodoText.trim() !== '') {
      const newTodo: TodoItem = {
        id: 0,
        text: newTodoText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  useEffect(()=>{
    
  },[todos]);

  return (
    <div className="App">
      <div className=" w-full my-5">
        <div className="p-5 w-full max-w-screen-md bg-white mx-auto border border-gray-100 rounded-sm">
          <h4 className=" text-2xl font-bold mb-2">Todo List</h4>
          
          <div className="mt-2">
            <div className="bg-gray-100 border border-gray-200 flex justify-center w-fit mx-auto rounded-md p-[1px]">
              <button onClick={()=> { setActiveTab('active') }} className={getTabClass('active')}>ACTIVE</button>
              <button onClick={()=> { setActiveTab('completed') }} className={getTabClass('completed')}>COMPLETED</button>
            </div>
          </div>

          {activeTab == 'active' && (
          <div className="relative mt-5">
            <input  value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} onKeyDown={addTodo}type="text" className="w-full p-2 pr-24 border border-gray-300 rounded-sm" placeholder="Enter task name..."/>
            <div className="absolute right-2 top-2  text-xs bg-gray-100 p-1">PRESS ENTER</div>
          </div>
          )}
          
          
          <div className="mt-2">
          { todos.length !== 0  && todos.map((todo,index) => (
            <div className="flex justify-between p-2 border-b border-b-gray-300 hover:bg-gray-100 hover:cursor-pointer">
              <div>{ todo.text }</div>
              <div className="">
                <button className="bg-gray-200 border-1 border-gray-300 text-sm p-1 mr-2 rounded-sm font-semibold "><BiCheckCircle /></button>
                <button className="bg-red-100 border-1 border-red-200 text-red-700 text-sm p-1 mr-2 rounded-sm font-semibold text-s"><BiTrash /></button>
              </div>
            </div>
          )) }
            

          </div>


        </div>
      </div>
    </div>
  );
}

export default App;

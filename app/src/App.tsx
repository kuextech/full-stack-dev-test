import React, { useEffect, useState }  from 'react';
import axios from 'axios';

import './App.css';

import { BiCheckCircle, BiTrash } from "react-icons/bi";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}


function App() {

  const API_URL = 'http://127.0.0.1:8000/api'
  
  
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filteredTodos, setfilteredTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [activeTab, setActiveTab] = useState<string>('active');

  const getTabClass = (tab: string) => {
    return activeTab === tab ? 'text-xs p-2 border border-gray-200 bg-white w-40 rounded-md m-[1px]' : 'text-xs p-2 border border-transparent w-40 rounded-md m-[1px] hover:bg-gray-200';
  };

  const getTodos = () => {
    axios.get(API_URL + '/todos').then((response) => {
      var data = response.data
      setTodos(data.todos);
    }).catch((error) => {
      console.log('An error occur while fetching, please check your API URL: ' + API_URL)
    });
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }

    addTodo();
  }

  const addTodo = () => {


    if (newTodoText.trim() !== '') {
      const newTodo: TodoItem = {
        id: 0,
        text: newTodoText,
        completed: false,
      };

      axios.post(API_URL + '/todos',newTodo).then((response) => {
        var data = response.data

        setTodos([...todos, data.todo]);
        setNewTodoText('');

        showSuccessMessage(data.message)

      }).catch((error) => {
        
        var response = error.response
        var data = response.data

        showErrorMessage(data.message)
      });
    }
  };

  const completeTodo = (todo: TodoItem) => {
    // Clone the original array to avoid mutating it directly
    const updatedTodos = [...todos];

    // Find the index of the item to update
    const indexToUpdate = updatedTodos.findIndex(item => item.id === todo.id);
    
    // Check if the item exists in the array
    if (indexToUpdate !== -1) {
      axios.put(API_URL + '/todos/' + todo.id + '/completed').then((response) => {
        var data = response.data

        showSuccessMessage(data.message)
      }).catch((error) => {
        
        var response = error.response
        var data = response.data

        showErrorMessage(data.message)
        
      });

      updatedTodos[indexToUpdate].completed = true;
      setTodos(updatedTodos);
    }
  }

  const deleteTodo = (todo: TodoItem) => {
    // Clone the original array to avoid mutating it directly
    const updatedTodos = [...todos];

    // Find the index of the item to update
    const indexToDelete = updatedTodos.findIndex(item => item.id === todo.id);
    
    // Check if the item exists in the array
    if (indexToDelete !== -1) {
      axios.delete(API_URL + '/todos/' + todo.id ).then((response) => {
        var data = response.data

        showSuccessMessage(data.message)
      }).catch((error) => {
        
        var response = error.response
        var data = response.data

        showErrorMessage(data.message)
      });

      updatedTodos.splice(indexToDelete,1)
      setTodos(updatedTodos);
    }
  }

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);

    // clear message
    setTimeout(()=>{
      setErrorMessage('')
    },800);
  }

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);

      setTimeout(()=>{
        setSuccessMessage('')
      },800);
  }

  useEffect(()=>{
    let filter = (activeTab === 'completed') ? true : false
    setfilteredTodos(todos.filter(item => item['completed'] === filter))
  },[todos,activeTab]);

  useEffect(()=> {
    getTodos()
  },[])

  return (
    <div className="App">
      <div className=" w-full my-5">
        <div className="p-5 w-full max-w-screen-md bg-white mx-auto border border-gray-200 rounded-md">

          <div className="mt-2">
            <div className="bg-gray-100 border border-gray-200 flex justify-center w-fit mx-auto rounded-md">
              <button onClick={()=> { setActiveTab('active') }} className={getTabClass('active')}>ACTIVE</button>
              <button onClick={()=> { setActiveTab('completed') }} className={getTabClass('completed')}>COMPLETED</button>
            </div>
          </div>

          
          
          {(successMessage && successMessage !== '') && (
            <div className="mt-3 py-1 px-2 text-xs text-green-600 border border-green-200 bg-green-50 rounded-sm">{ successMessage }</div>
          )}

          {(errorMessage && errorMessage !== '') && (
            <div className="mt-3 py-1 px-2 text-xs text-red-600 border border-red-200 bg-red-50 rounded-sm">{ errorMessage }</div>
          )}
          

          {activeTab === 'active' && (
          <div className="relative mt-4">
            <input  value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} onKeyDown={handleEnter}type="text" className="w-full p-2 pr-24 border border-gray-300 rounded-sm" placeholder="Enter task name..."/>
            <button type="button" onClick={addTodo} className="absolute right-2 top-2  text-xs text-gray-400 bg-gray-100 py-1 px-2 font-bold">PRESS ENTER</button>
          </div>
          )}
          
          
          <div className="mt-2">
          { filteredTodos.length !== 0  && filteredTodos.map((todo,index) => (
            <div className="flex justify-between p-2 border-b border-b-gray-300 hover:bg-gray-50 hover:cursor-pointer" key={'todo-' + activeTab + '-' + index}>
              <div>{ todo.text }</div>
              <div className="">
                {activeTab === 'active' && (
                  <button onClick={()=> { completeTodo(todo) }} className="bg-gray-200 border-1 border-gray-300 text-sm p-1 mr-2 rounded-sm font-semibold hover:bg-green-300 hover:text-green-950"><BiCheckCircle /></button>
                )}
                <button onClick={()=> { deleteTodo(todo) }} className="bg-red-100 border-1 border-red-200 text-red-700 text-sm p-1 mr-2 rounded-sm font-semibold hover:bg-red-200 hover:text-red-800"><BiTrash /></button>
              </div>
            </div>
          )) }
            { filteredTodos.length < 1 && (
              <div className="mt-2 p-10 border border-gray-200 text-center text-gray-400">No {activeTab} task found!</div>
            ) }

          </div>


        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import EditForm from '../src/EditForm'
import './App.css';


export default () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [todoToEdit, setTodoToEdit] = useState(null);

  const addTodo = async event => {
    event.preventDefault();
    const newTodo = { name: input, done: false, id: new Date().getTime() };

    setTodos([...todos, newTodo]);
    //setTodos(newTodo => [...newTodo, { name: input, done: false, id: new Date().getTime() }])
    setInput('')
  };

  const remove = async id => {
    setTodos(oldTodos => oldTodos.filter(t => t.id !== id))

  };

  const handleInputChange = event => {
    setInput(event.target.value);
  };


  const toggleDone = (id) => {
    setTodos(oldTodos => oldTodos.map((t) => {
      if (t.id === id) {
        t.done = !t.done
      }
      return t;
    }))
  }

  const editTodo = (todo) => {
    console.log('editTodo', todo)
    setTodoToEdit(todo);
  }

  const updateTodo = (todo) => {
    console.log('updateTodo', todo);
    setTodos(oldTodos => oldTodos.map((t) => {
      if (t.id === todo.id) {
        return todo;
      } else {
        return t;
      }
    }))

    setTodoToEdit(null);

  }

  return (
    <div className='App'>
      <h1>✨ To Do App ✨</h1>
      <form className='App-form' onSubmit={addTodo}>
        <input
          value={input}
          autoComplete='off'
          type='text'
          name='name'
          onChange={handleInputChange}
        />
        <button type='submit' className='App-button'>
          Add todo
        </button>
      </form>

      <ul>
        {todos.map(todo => (
          <>
            <li key={todo.id} onClick={() => toggleDone(todo.id)} style={{
              textDecoration: todo.done ? 'line-through' : 'none',
            }} >
              {todo.name}
            </li>
            <button className='App-button' onClick={() => remove(todo.id)}>
              Delete
        </button>
            <button onClick={() => editTodo(todo)}>Edit</button>
            {todoToEdit && todo.id === todoToEdit.id &&
              <EditForm updateTodo={updateTodo} todo={todoToEdit} />
            }
          </>
        ))}
      </ul>
    </div>
  );
};
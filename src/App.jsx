import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      if (editingIndex !== -1) {
        
        
        const updatedTodos = [...todos];
        updatedTodos[editingIndex].title = newTodo;
        setTodos(updatedTodos);
        setEditingIndex(-1);
      } else {
       
        setTodos([...todos, { title: newTodo, completed: false }]);
      }
      setNewTodo('');
    }
  };

  const handleEditTodo = (index) => {
    setNewTodo(todos[index].title);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    if (index === editingIndex) {
      setNewTodo('');
      setEditingIndex(-1);
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>
          {editingIndex !== -1 ? 'Actualizar Tarea' : 'Añadir Tareas ' }
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed  ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
              />
              {todo.completed ? <span className="texto completo">Completado &nbsp;</span> : null}
              <span>{todo.title}</span>
            </label>
            <div>
              <button onClick={() => handleEditTodo(index)}>Editar </button>
              <button onClick={() => handleDeleteTodo(index)}>Eliminar tareas Completadas  </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


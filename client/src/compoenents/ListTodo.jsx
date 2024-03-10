import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchTodos = async () => {
        try {
          const response = await axios.get('http://localhost:3001/todos');
          setTodos(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch todos:', error);
          alert('Failed to fetch todos. Please try again.');
          setLoading(false);
        }
      };

      fetchTodos();
    }, 2000); // Delay for 2000ms
  }, [todos]);

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${todoId}`);

      // Update the local todos state after successful deletion
      setTodos(todos.filter((todo) => todo.id !== todoId));

      // Display a success message or feedback to the user
      console.log('Todo deleted successfully');
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error('Failed to delete todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-center mt-3">Todo List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {todos.length > 0 && (
            <table>
              <thead>
                <tr>
                <th>{todos.length}</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td>{todo.description}</td>
                    <td>
                      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ListTodo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

      const response = await axios.post('http://localhost:3001/todos', { name, description });
    console.log(response.data,'d')
      
      setName('');
      setDescription('');
    } catch (error) {
      setError('Failed to create todo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Pern Todo List</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Todo Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Todo Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Creating...' : 'Create Todo'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTodo;

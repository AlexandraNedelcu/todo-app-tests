import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const login = async () => {
    try {
      await axios.post(`${API}/login`, { username, password });
      setIsLoggedIn(true);
    } catch (err) {
      alert("Login failed");
    }
  };

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/items`);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTodo) return;
    const res = await axios.post(`${API}/items`, { title: newTodo });
    setTodos([...todos, res.data]);
    setNewTodo("");
  };

  const editTodo = async (id) => {
    const title = prompt("New title:");
    if (!title) return;
    const res = await axios.put(`${API}/items/${id}`, { title });
    setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/items/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (isLoggedIn) fetchTodos();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input
        placeholder="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => editTodo(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
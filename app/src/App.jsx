import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Respond to school admin", completed: true },
    { id: 2, text: "Order gardening shears", completed: false },
    { id: 3, text: "Book winter tyres", completed: false },
    { id: 4, text: "Buy new pillows", completed: false },
  ]);

  function handleAddTodo(newTodo) {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <main className="app">
      <h1>To Do</h1>
      <TodoForm onAdd={handleAddTodo} />
      <p>Number of tasks: {todos.length}</p>
      <ul className="todo-list">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggleCompleted}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </main>
  );
  function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <li className={todo.completed ? "completed" : "todo"}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <p className="todo-text">{todo.text}</p>

        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          Delete
        </button>
      </li>
    );
  }
  function TodoForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      const newTodo = text.trim();
      if (!newTodo) return;
      onAdd(newTodo);
      setText("");
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default App;

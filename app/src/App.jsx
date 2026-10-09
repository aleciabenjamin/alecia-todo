import { useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

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
      <h1>To Do List</h1>
      <TodoForm onAdd={handleAddTodo} />
      <p className="task-counter">Number of tasks: {todos.length}</p>
      {todos.length === 0 ? (
        <div className="empty-state-message">
          🎉 Well done! You've done it all! Time to chill.
        </div>
      ) : (
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
      )}
    </main>
  );
}

export default App;

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

  const [filter, setFilter] = useState("all");

	const currentDate = new Date().toLocaleDateString("en-SE", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main className="app">
      <h1>To Do List</h1>
			<p className="current-date">{currentDate}</p>
      <TodoForm onAdd={handleAddTodo} />
      <p className="task-counter">Number of tasks: {todos.length}</p>
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {filteredTodos.length === 0 ? (
        <div className="empty-state-message">
          {todos.length === 0
            ? "🎉 Well done! You've done it all! Time to chill."
            : "No tasks found in this view."}
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((t) => (
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

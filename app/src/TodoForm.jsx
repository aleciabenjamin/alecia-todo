import { useState } from "react";

export default function TodoForm({ onAdd }) {
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

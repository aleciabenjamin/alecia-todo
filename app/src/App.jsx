import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
		{id: 1, text: "Respond to school admin", completed: true},
		{id: 2, text: "Order gardening shears", completed: false},
		{id: 3, text: "Book winter tyres", completed: false},
		{id: 4, text: "Buy new pillows", completed: false}
	]);
  const [text, setText] = useState('')

	function addTodo(e) {
		e.preventDefault();
		const newTodo = text.trim();
		if(!newTodo) return;
		setTodos([...todos, {id: Date.now(), text: newTodo, completed: false}]);
		setText('');
	}

   return (
    <main className="app">
      <h1>To Do</h1>
			<form onSubmit={addTodo}>
				<input
					type="text"
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder="Add a new task..."
				/>
				<button type="submit">Add Task</button>
			</form>
      <p>Number of tasks: {todos.length}</p>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;

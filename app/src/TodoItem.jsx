export default function TodoItem({ todo, onToggle, onDelete }) {
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

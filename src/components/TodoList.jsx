import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";

function TodoList({ childId }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!childId) {
      return;
    }

    const fetchTodos = async () => {
      try {
        const data = await getTodos(childId);

        console.log(data); // ←ここ追加

        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [childId]);

  return (
    <div>
      <h3>TODO一覧</h3>

      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`todo-row ${todo.status === "DONE" ? "done" : ""}`}
        >
          <span>
            {todo.status === "DONE" ? "✓" : "□"} {todo.title}（{todo.point}pt）
          </span>

          <span className="todo-date">📅 {todo.dueDate}</span>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

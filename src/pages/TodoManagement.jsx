import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTodos, deleteTodo } from "../api/todoApi";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

function TodoManagement() {
  const { user: _user, loading } = useAuth();
  const [todos, setTodos] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const childId = query.get("childId");

  const fetchTodos = async () => {
    try {
      const data = await getTodos(childId);
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos(childId);
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!childId) return;

    fetchTodos();
  }, [childId]);
  if (loading) return <p>Loading...</p>;

  // 🗑 削除
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos(); // 再取得
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="parent-container">
      <Header />
      <h2 className="parent-title">📋 Todo Management</h2>

      <div className="card">
        <button onClick={() => navigate(`/todo/edit?childId=${childId}`)}>
          ➕ Todo追加
        </button>

        <button onClick={() => navigate("/parent")}>🔙 戻る</button>
      </div>

      <div className="card">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.status === "DONE" ? "done" : ""}`}
            >
              <div className="todo-left">
                <div className="todo-title">
                  {todo.status === "DONE" ? "✓" : "□"} {todo.title}（
                  {todo.point}pt）
                </div>
                <div className="todo-date">📅 {todo.dueDate}</div>
              </div>

              <div className="todo-actions">
                <button
                  onClick={() =>
                    navigate(`/todo/edit?id=${todo.id}&childId=${childId}`)
                  }
                >
                  編集
                </button>

                <button onClick={() => handleDelete(todo.id)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoManagement;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTodo, updateTodo, getTodos } from "../api/todoApi";

function TodoEdit() {
  const [title, setTitle] = useState("");
  const [point, setPoint] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const childId = query.get("childId");

  // 編集時：既存データ取得
  useEffect(() => {
    if (!id || !childId) return;

    const fetchTodo = async () => {
      try {
        const todos = await getTodos(childId);
        const target = todos.find((t) => t.id === Number(id));

        if (target) {
          setTitle(target.title);
          setPoint(target.point);
          setDueDate(target.dueDate || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodo();
  }, [id, childId]);

  // 保存処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      title,
      point,
      dueDate,
      childId,
    };

    try {
      if (id) {
        await updateTodo(id, todoData);
      } else {
        await createTodo(todoData);
      }

      navigate(`/todo?childId=${childId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="parent-container">
      <h2 className="parent-title">✏️ Todo Edit</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>タイトル</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>ポイント</label>
            <input
              type="number"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
            />
          </div>

          <div>
            <label>期限日</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit">💾 保存</button>
        </form>

        <button onClick={() => navigate(-1)}>🔙 戻る</button>
      </div>
    </div>
  );
}

export default TodoEdit;

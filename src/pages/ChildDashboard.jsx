import { useEffect, useState } from "react";
import { getChildTop } from "../api/childApi";
import { completeTodo } from "../api/todoApi";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

function ChildDashboard() {
  const { user: _user, loading } = useAuth();
  const [childData, setChildData] = useState(null);
  const [pointDiff, setPointDiff] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showGoalAchieved, setShowGoalAchieved] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getChildTop();

      if (childData) {
        const pointDiff = data.point - childData.point;
        const isLevelUp = data.level > childData.level;
        const isGoalAchieved =
          data.point >= data.goalPoint && childData.point < childData.goalPoint;

        let delay = 0;

        // ① ポイント演出（2秒）
        if (pointDiff > 0) {
          setTimeout(() => {
            setPointDiff(pointDiff);
            setShowEffect(true);

            setTimeout(() => {
              setShowEffect(false);
            }, 2000);
          }, delay);

          delay += 3000;
        }

        // ② レベルアップ（5秒）
        if (isLevelUp) {
          setTimeout(() => {
            setShowLevelUp(true);

            setTimeout(() => {
              setShowLevelUp(false);
            }, 5000);
          }, delay);

          delay += 6000;
        }

        // ③ 目標達成（5秒）
        if (isGoalAchieved) {
          setTimeout(() => {
            setShowGoalAchieved(true);

            setTimeout(() => {
              setShowGoalAchieved(false);
            }, 5000);
          }, delay);

          delay += 6000;
        }
      }

      setChildData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, []);
   if (loading) return <div>Loading...</div>;  

  const handleComplete = async (todoId) => {
    try {
      await completeTodo(todoId);

      // 再取得（←これが重要）
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (!childData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="child-container">
      <Header />
      <h2 className="title">🌈 Kid Dashboard 🌈</h2>

      <div className="status-card">
        <p className="point">⭐ {childData.point} pt</p>

        {showEffect && <span className="point-effect">+{pointDiff}pt</span>}

        {showLevelUp && (
          <video className="effect-video" src="/levelup.mp4" autoPlay muted />
        )}

        {showGoalAchieved && (
          <video className="effect-video" src="/complete.mp4" autoPlay muted />
        )}

        <p>🏆 LEVEL : {childData.level}</p>
        <p>🎯 GOAL : {childData.goalPoint}</p>
      </div>

      <h3>📋 ミッション</h3>

      <ul className="todo-list">
        {childData.todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.status === "DONE" ? "done" : ""}`}
          >
            <span className="todo-text">
              <div className="todo-title">
                {todo.title}（{todo.point}pt）
              </div>
              <div className="todo-date">📅 {todo.dueDate}</div>
            </span>

            {todo.status !== "DONE" && (
              <button onClick={() => handleComplete(todo.id)}>✅ クリア</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChildDashboard;

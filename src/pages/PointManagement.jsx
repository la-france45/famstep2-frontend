import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePoint, updateGoal, resetPoint } from "../api/userApi";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

function PointManagement() {
  const { user: _user, loading } = useAuth();
  const [point, setPoint] = useState(0);
  const [goal, setGoal] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const childId = query.get("childId");

  useEffect(() => {
    if (!childId) return;

    const fetchChild = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/${childId}`, {
          credentials: "include",
        });

        const data = await res.json();

        setPoint(data.point);
        setGoal(data.goalPoint);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChild();
  }, [childId]);
  if (loading) return <p>Loading...</p>;

  const handleUpdatePoint = async () => {
    try {
      await updatePoint(childId, point);
      alert("ポイント更新しました！");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateGoal = async () => {
    try {
      await updateGoal(childId, goal);
      alert("目標ポイント更新しました！");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      await resetPoint(childId);
      setPoint(0);
      alert("ポイントリセットしました！");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="parent-container">
      <Header />
      <h2 className="parent-title">📊 Point Management</h2>

      <div className="card">
        <p>現在ポイント</p>
        <input
          type="number"
          value={point}
          onChange={(e) => setPoint(Number(e.target.value))}
        />
        <button onClick={handleUpdatePoint}>更新</button>
      </div>

      <div className="card">
        <p>目標ポイント</p>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
        <button onClick={handleUpdateGoal}>更新</button>
      </div>

      <div className="card">
        <button onClick={handleReset}>🔄 ポイントリセット</button>
      </div>

      <button onClick={() => navigate("/parent")}>🔙 戻る</button>
    </div>
  );
}

export default PointManagement;

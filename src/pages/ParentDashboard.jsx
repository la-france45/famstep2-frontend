import { useEffect, useState } from "react";

import { getChildren } from "../api/parentApi";
import Header from "../components/Header";
import ChildSelector from "../components/ChildSelector";
import ChildStatus from "../components/ChildStatus";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ParentDashboard() {
  const { user: _user, loading } = useAuth();
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const fetchChildren = async () => {
      try {
        const data = await getChildren();
        setChildren(data);

        if (data.length > 0) {
          setSelectedChildId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChildren();
  }, [loading]);

  if (loading) return <p>Loading...</p>;

  const selectedChild = children.find((child) => child.id === selectedChildId);

  return (
    <div className="parent-container">
      <Header />
      <h2 className="parent-title">👨‍👩‍👧 Parent Dashboard</h2>

      <div className="card">
        <ChildSelector
          children={children}
          selectedChildId={selectedChildId}
          onChange={setSelectedChildId}
        />
      </div>

      <div className="card">
        <ChildStatus child={selectedChild} />
      </div>

      <div className="card">
        <TodoList childId={selectedChildId} />
      </div>

      <div className="button-group">
        <button onClick={() => navigate(`/point?childId=${selectedChildId}`)}>
          📊 ポイント管理
        </button>

        <button onClick={() => navigate(`/todo?childId=${selectedChildId}`)}>
          📋 TODO管理
        </button>
      </div>
    </div>
  );
}

export default ParentDashboard;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage";
import ParentDashboard from "./pages/ParentDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import PointManagement from "./pages/PointManagement";
import TodoManagement from "./pages/TodoManagement";
import TodoEdit from "./pages/TodoEdit";

import { getMe } from "./api/authApi";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await getMe();

        setUser(me);
      } catch (error) {
        console.log("not logged in");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/child" element={<ChildDashboard />} />
        <Route path="/point" element={<PointManagement />} />
        <Route path="/todo" element={<TodoManagement />} />
        <Route path="/todo/edit" element={<TodoEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

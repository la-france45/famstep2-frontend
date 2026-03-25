import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header">
      <button className="logout-btn" onClick={handleLogout}>
        🔓 ログアウト
      </button>
    </div>
  );
}

export default Header;
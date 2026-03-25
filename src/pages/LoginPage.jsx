import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login(name, password);

      if (!user) {
        alert("名前またはパスワードが違います");
        return;
      }

      if (user.role === "PARENT") {
        navigate("/parent");
      } else {
        navigate("/child");
      }
    } catch (error) {
      console.error(error);
      alert("ログイン失敗");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌈 FamStep2 🌈</h1>
        <p>目標ポイントをめざそう！</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>なまえ</label>
            <input
              type="text"
              placeholder="なまえ"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>パスワード</label>
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">🚀 はじめる</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

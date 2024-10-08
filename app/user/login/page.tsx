"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // ① メルアドとパスワードをバックエンドに送る。
      const response = await fetch(`http://localhost:3001/api/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      // ② 成功したら、messageとtokenが、帰ってくる。tokenの方を、ブラウザのローカルストレージに入れる。
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message);
    } catch (error) {
      alert("ログイン失敗");
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
        <button>ログイン</button>
      </form>
    </div>
  )
}

// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const emailValid = emailRegex.test(email);
  const passwordValid = passwordRegex.test(password);
  const formValid = emailValid && passwordValid && accepted;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (formValid) {
      navigate("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
        />
        {touched.email && !emailValid && (
          <p data-cy="email-error">Geçerli bir email adresi giriniz.</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
        />
        {touched.password && !passwordValid && (
          <p data-cy="password-error">
            Şifre en az 8 karakter olmalı, büyük/küçük harf, rakam ve özel karakter içermeli.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          Şartları kabul ediyorum
        </label>
      </div>

      <button type="submit" disabled={!formValid}>
        Login
      </button>
    </form>
  );
}
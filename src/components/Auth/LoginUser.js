import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

export const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // После успешной аутентификации устанавливаем статус аутентификации в локальном хранилище
      localStorage.setItem("isAuthenticated", "true");

      // Перенаправляем на главную страницу
      await navigate("/");
    } catch (error) {
      console.error("Ошибка входа:", error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
    dispatch(authActions.login());
  };

  return (
    <div className="container ">
      <div className="main cont">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="authForm">Войти</h3>
          <fieldset className="fieldset">
            <label htmlFor="">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <label htmlFor="">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="fieldset" type="submit">
              Войти
            </button>
          </fieldset>
          <p>
            У вас нет аккаунта?{" "}
            <NavLink to="/auth/register">Регистрация</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const AddNewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newUserAuth, setNewUserAuth] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserAuth((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUserAuth.password !== newUserAuth.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!newUserAuth.password) {
      setError("Введите пароль");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserAuth.email,
        newUserAuth.password
      );
      const user = userCredential.user;

      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        name: newUserAuth.name,
        email: newUserAuth.email,
      });

      dispatch(authActions.login());
      setShowModal(true);

      localStorage.setItem('isLoggedIn', 'true'); // Сохраняем статус аутентификации в localStorage

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="main cont">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="authForm">Регистрация</h3>
          <fieldset className="fieldset">
            <label htmlFor="name">E-mail</label>
            <input
              type="email"
              placeholder="Введите почту"
              name="email"
              value={newUserAuth.email}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label htmlFor="">Полное имя</label>
            <input
              type="text"
              placeholder="Введите полное имя"
              name="name"
              value={newUserAuth.name}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label htmlFor="">Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              name="password"
              value={newUserAuth.password}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label htmlFor="">Подтвердите пароль</label>
            <input
              type="password"
              placeholder="Подтвердите пароль"
              name="confirmPassword"
              value={newUserAuth.confirmPassword}
              onChange={handleChange}
            />
            <Button className="fieldset" type="submit">
              Зарегистрироваться
            </Button>
          </fieldset>
          <p>
            У вас уже есть аккаунт? <NavLink to="/auth/login">Войти</NavLink>
          </p>
        </form>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Успешная регистрация</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы успешно зарегистрировались!</Modal.Body>
      </Modal>
      {error && (
        <Modal show={true} onHide={() => setError("")}>
          <Modal.Header closeButton>
            <Modal.Title>Ошибка</Modal.Title>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AddNewUser;

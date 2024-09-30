import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getAuth } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutUser = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  // Проверяем, сохранена ли информация об аутентификации в локальном хранилище
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      await auth.signOut();
      dispatch(authActions.logout());
      // Удаляем информацию об аутентификации из локального хранилища при выходе
      localStorage.removeItem("isAuthenticated");

    } catch (error) {
      console.error("Ошибка выхода из аккаунта:", error.message);
    }
  };

  return (
    <div>
      <NavLink
        to="/"
        className="nav-link text-uppercase"
        activeClassName="active"
        onClick={logoutHandler}
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
      </NavLink>
    </div>
  );
};

export default LogoutUser;

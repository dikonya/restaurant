import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import UserStore from "./utils/Data/UserData";
import { createContext } from "react";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      setCurrentUser: (user) => {
        // Ваша логика установки текущего пользователя
      }
    }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById("root")
);

reportWebVitals();

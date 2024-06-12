import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import UserContextProvider from "./Context/UserContextProvider";
import { RoleContext } from "./Context/ContextData";
import RoleContextProvider from "./Context/RoleContextProvider";
import ModelContextProvider from "./Context/ModelContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ModelContextProvider>
        <RoleContextProvider>
          <UserContextProvider>
            <Routes>
              <Route element={<UserList />} path="/" />
            </Routes>
          </UserContextProvider>
        </RoleContextProvider>
      </ModelContextProvider>
    </BrowserRouter>
  );
}

export default App;

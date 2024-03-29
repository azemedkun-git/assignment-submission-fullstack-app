import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStrorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="Login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;

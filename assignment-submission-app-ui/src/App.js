import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import Homepage from "./Homepage";
import { PrivateRoute } from "./PrivateRoute";
import { AssignmentView } from "./AssignmentView";
import Login from "./Login";
import { useLocalState } from "./util/useLocalStrorage";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRoleFromJwt());

  function getRoleFromJwt() {
    if (jwt) {
      const decodeJwt = jwtDecode(jwt);
      return decodeJwt.authorities;
    } else {
      return [];
    }
  }
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route path="/assignments/:id" element={<AssignmentView />} />
      <Route path="Login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}
export default App;

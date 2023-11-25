import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import { PrivateRoute } from "./PrivateRoute";
import { AssignmentView } from "./AssignmentView";
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
      <Route path="/assignments/:id" element={<AssignmentView />} />
      <Route path="Login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;

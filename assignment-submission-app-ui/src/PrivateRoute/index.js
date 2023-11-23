import React from "react";
import { useLocalState } from "../util/useLocalStrorage";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  return jwt ? children : <Navigate to="/login" />;
};

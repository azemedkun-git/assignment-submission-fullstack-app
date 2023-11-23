import React from "react";
import { useLocalState } from "../util/useLocalStrorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  function createAssignment() {
    fetch("/assignments", {
      headers: {
        "content-type": "application/json",
        Authentication: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
  return (
    <div style={{ margin: "2em" }}>
      <button onClick={() => createAssignment()}>Submit New Assignment</button>
    </div>
  );
};

export default Dashboard;

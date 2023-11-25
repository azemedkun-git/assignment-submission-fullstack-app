import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalState } from "../util/useLocalStrorage";
import { ajax } from "../Services/fetchService";

export const AssignmentView = () => {
  //const assignmentId = window.location.href.split("/assignments/")[1]; //This can also work to get the path
  const { id } = useParams();

  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
  });
  const { githubUrl, branch } = assignment;

  const [jwt, setJwt] = useLocalState("", "jwt");

  function updateAssignment(e) {
    // const newAssignment = { ...assignment };
    // newAssignment[prop] = value;
    // setAssignment(newAssignment);
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
    console.log(assignment);
  }

  function save() {
    ajax(`/api/assignments/${id}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }
  useEffect(() => {
    ajax(`/api/assignments/${id}`, "GET", jwt).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }, [id, jwt]);

  return (
    <div>
      <h1> Assignment {id}</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h2>
            GitHub URL:
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={githubUrl || ""}
              onChange={(e) => updateAssignment(e)}
            />
          </h2>
          <h2>
            Branch:
            <input
              type="text"
              id="branch"
              name="branch"
              value={branch || ""}
              onChange={(e) => updateAssignment(e)}
            />
          </h2>
          <button type="submit" onClick={() => save()}>
            Submit Assignment
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

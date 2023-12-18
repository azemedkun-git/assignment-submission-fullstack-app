import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStrorage";
import { Link, Navigate } from "react-router-dom";
import { ajax } from "../Services/fetchService";
import { Button, Card, Col, Row } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  function createAssignment() {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
  }
  return (
    <div style={{ margin: "2em" }}>
      <div className="mb-4">
        <Button size="lg" onClick={() => createAssignment()}>
          Submit New Assignment
        </Button>
      </div>

      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card style={{ width: "18rem" }} key={assignment.id}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title> Assignment # {assignment.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                {assignment.status}
                <Card.Text style={{ marginTop: "1em" }}>
                  <p>
                    <b>GitHub Url</b>: {assignment.githubUrl}
                  </p>
                </Card.Text>
                <Card.Text>
                  <p>
                    <b>GitHub Url:</b> {assignment.branch}
                  </p>
                </Card.Text>

                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;

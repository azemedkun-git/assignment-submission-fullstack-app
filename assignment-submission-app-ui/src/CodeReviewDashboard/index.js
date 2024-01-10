import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStrorage";
import { ajax } from "../Services/fetchService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../App.css";
import { jwtDecode } from "jwt-decode";
import { StatusBadge } from "../StatusBadge";
import { useNavigate } from "react-router-dom";

const CodeReviewerDashboard = () => {
  //let navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  function editReview(assignment) {
    window.location.href = `/assignments/${assignment.id}`;
  }
  function claimAssignment(assignment) {
    const decodeJwt = jwtDecode(jwt);
    const user = {
      id: null,
      username: decodeJwt.sub,
    };
    assignment.codeReviewer = user;
    //TODO: don't hardcode this status
    assignment.status = "In Review";
    ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(
      (updatedAssignment) => {
        const assignmentCopy = [...assignments];
        const i = assignmentCopy.findIndex((a) => a.id === assignment.id);
        assignmentCopy[i] = updatedAssignment;
        setAssignments(assignmentCopy);
      }
    );
  }
  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, [jwt]);

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Log out
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1">Code Review Dashboard</div>
        </Col>
      </Row>

      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Review</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <Card style={{ width: "18rem" }} key={assignment.id}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title> Assignment # {assignment.number}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle> */}
                    {/* This div is required to keep the staus at the 
                start only, not to expand to the full card width */}
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub Url</b>: {assignment.githubUrl}
                      </p>
                    </Card.Text>
                    <Card.Text>
                      <p>
                        <b>Branch</b>: {assignment.branch}
                      </p>
                    </Card.Text>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        editReview(assignment);
                      }}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper submitted ">
        <div className="h3 px-2 assignment-wrapper-title">Awaiting Review</div>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => {
                if (a.status === "Resubmitted") return -1;
                else return 1;
              })
              .map((assignment) => (
                <Card style={{ width: "18rem" }} key={assignment.id}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title> Assignment # {assignment.number}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle> */}
                    {/* This div is required to keep the staus at the 
                start only, not to expand to the full card width */}
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub Url</b>: {assignment.githubUrl}
                      </p>
                    </Card.Text>
                    <Card.Text>
                      <p>
                        <b>Branch</b>: {assignment.branch}
                      </p>
                    </Card.Text>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        claimAssignment(assignment);
                      }}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
      <div className="assignment-wrapper needs-update">
        <div className="h3 px-2 assignment-wrapper-title">Needs Update</div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card style={{ width: "18rem" }} key={assignment.id}>
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title> Assignment # {assignment.number}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle> */}
                    {/* This div is required to keep the staus at the 
                start only, not to expand to the full card width */}
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
                    </div>
                    <Card.Text style={{ marginTop: "1em" }}>
                      <p>
                        <b>GitHub Url</b>: {assignment.githubUrl}
                      </p>
                    </Card.Text>
                    <Card.Text>
                      <p>
                        <b>Branch </b>: {assignment.branch}
                      </p>
                    </Card.Text>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.location.href = `/assignments/${assignment.id}`;
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No assignments found</div>
        )}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;

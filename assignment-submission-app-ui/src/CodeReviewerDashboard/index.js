import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStrorage";
import { ajax } from "../Services/fetchService";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";

const CodeReviewerDashboard = () => {
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

      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card style={{ width: "18rem" }} key={assignment.id}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title> Assignment # {assignment.number}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle> */}
                {/* This div is required to keep the staus at the 
                start only, not to expand to the full card width */}
                <div className="d-flex align-items-start">
                  <Badge
                    pill
                    bg="info"
                    style={{ fontSize: "1em", justifyContent: "flex-start" }}
                  >
                    {assignment.status}
                  </Badge>
                </div>
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
    </Container>
  );
};

export default CodeReviewerDashboard;

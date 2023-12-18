import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalState } from "../util/useLocalStrorage";
import { ajax } from "../Services/fetchService";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

export const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  //const assignmentId = window.location.href.split("/assignments/")[1]; //This can also work to get the path
  const { id } = useParams();

  const [assignment, setAssignment] = useState({
    githubUrl: "",
    branch: "",
  });
  //const { githubUrl, branch } = assignment;

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    // setAssignment({ ...assignment, [e.target.name]: e.target.value });
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
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1>Assignment {id}</h1>
        </Col>
        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment?.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                variant={"info"}
                title="assignment 1"
              >
                {[1, 2, 3, 4, 5].map((assignmentNum) => (
                  <Dropdown.Item eventKey={assignmentNum}>
                    {assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                id="githubRrl"
                type="url"
                value={assignment.githubUrl || ""}
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                placeholder="Https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Branch :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                id="branch"
                type="text"
                name="branch"
                value={assignment.branch || ""}
                onChange={(e) => updateAssignment(e)}
                placeholder="example_branch_name"
              />
            </Col>
          </Form.Group>
          <Button size="lg" type="submit" onClick={() => save()}>
            Submit Assignment
          </Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

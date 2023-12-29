import React, { useRef } from "react";
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
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }
  function persist() {
    ajax(`/api/assignments/${id}`, "PUT", jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }
  //Save func modified to support useRef and fix problems with persisting staus change
  function save() {
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
    } else persist();
  }

  //useRef and below block of code, is required because the asynchronousness of React do not allow the assignment
  //status in the save() function to change and send to database immediately.
  // It allows change to occur later. So, the change is not reflected in the database

  /********************** From Here ****************************************/
  const previousAssignmentValue = useRef(assignment);

  useEffect(() => {
    if (previousAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    previousAssignmentValue.current = assignment;
  }, [assignment]);

  /********************* To Here *******************************************/

  useEffect(() => {
    ajax(`/api/assignments/${id}`, "GET", jwt).then((assignmentResponse) => {
      let assignmentData = assignmentResponse?.assignment;
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      setAssignment(assignmentData);
      setAssignmentEnums(assignmentResponse.assignmentEnums);
      setAssignmentStatuses(assignmentResponse.statusEnums);
    });
  }, [id, jwt]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
        </Col>
        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment?.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an assignment"
                }
                onSelect={(selectedElement) =>
                  updateAssignment("number", selectedElement)
                }
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    eventKey={assignmentEnum.assignmentNum}
                    key={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}{" "}
                    {assignmentEnum.assignmentName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githubRrl">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                value={assignment?.githubUrl || ""}
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                placeholder="Https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="3" md="2">
              Branch :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                name="branch"
                value={assignment?.branch || ""}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                placeholder="example_branch_name"
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            <Button size="lg" type="submit" onClick={() => save()}>
              Submit Assignment
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

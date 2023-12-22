package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.web;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user){
        Assignment newAssignment =  assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
        Set<Assignment> assignmentsByUser =assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsByUser);
    }
    @GetMapping("{id}")
    public ResponseEntity<?> getAssignment(@PathVariable Long id , @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentsOpt =assignmentService.findById(id);
        return ResponseEntity.ok(new AssignmentResponseDto(assignmentsOpt.orElse(new Assignment())));
    }
    @PutMapping("{id}")
    public ResponseEntity<?> updateAssignment(@PathVariable Long id ,
                                              @RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user){
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}

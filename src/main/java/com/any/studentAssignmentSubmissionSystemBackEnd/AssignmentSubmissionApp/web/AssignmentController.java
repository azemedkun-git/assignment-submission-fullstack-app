package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.web;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.Util.AuthorityUtil;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service.AssignmentService;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service.UserService;
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
    @Autowired
    private UserService userService;
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
        //Add the code reviewer to this assignment if it is claimed
        if(assignment.getCodeReviewer() !=null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
            if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            }
        }
        Assignment updatedAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updatedAssignment);
    }
}

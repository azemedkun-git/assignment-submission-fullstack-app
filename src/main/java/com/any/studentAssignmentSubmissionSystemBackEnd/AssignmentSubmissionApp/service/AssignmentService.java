package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment
                = new Assignment();
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }
    public Set<Assignment> findByUser(User user){
        return assignmentRepository.findByUser(user);
    }
    public Optional<Assignment> findById(Long id){
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}

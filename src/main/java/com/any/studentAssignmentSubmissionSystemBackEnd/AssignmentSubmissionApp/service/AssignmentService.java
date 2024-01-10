package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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
        assignment.setNumber(findNextAssignmentToSubmit(user));
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentByUser = assignmentRepository.findByUser(user);
        Optional<Assignment> currNumber = assignmentByUser.stream().max(Comparator.comparingInt(Assignment::getNumber));
        return currNumber.map(assignment -> assignment.getNumber() + 1).orElse(1);
    }

    public Set<Assignment> findByUser(User user){
        boolean hasCodeReviewerRole =
                user.getAuthorities()
                .stream()
                .anyMatch(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()));
        if(hasCodeReviewerRole){
            return assignmentRepository.findByCodeReviewer(user);
        }
        return assignmentRepository.findByUser(user);
    }
    public Optional<Assignment> findById(Long id){
        return assignmentRepository.findById(id);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }
}

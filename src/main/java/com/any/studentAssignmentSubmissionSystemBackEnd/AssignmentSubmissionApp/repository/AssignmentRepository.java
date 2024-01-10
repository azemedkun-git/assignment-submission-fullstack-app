package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.repository;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Set<Assignment> findByUser(User user);
    @Query("select a from Assignment a " +
            "where (a.status = 'Submitted' and (a.codeReviewer is null or a.codeReviewer= :codeReviewer)) " +
            "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);
}
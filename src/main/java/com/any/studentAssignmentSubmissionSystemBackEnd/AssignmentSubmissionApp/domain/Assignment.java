package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String githubUrl;
    private String branch;
    private String coeReviewVideoUrl;
    @ManyToOne(optional = false)
    private User assignedTo;

}

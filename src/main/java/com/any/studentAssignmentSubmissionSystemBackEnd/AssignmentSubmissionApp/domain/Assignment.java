package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer number;
    private String status;
    private String githubUrl;
    private String branch;
    private String codeReviewVideoUrl;
    @ManyToOne
    private User codeReviewer;
    @ManyToOne(optional = false)
    private User user;

}

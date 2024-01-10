package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonFormat(shape = JsonFormat.Shape.OBJECT) //marshaling enums into Json object
public enum AssignmentStatusEnum {
    PENDING_SUBMISSION("Pending Submission", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In Review", 3),
    NEEDS_UPDATE("Needs Update", 4),
    COMPLETED("Completed", 5),
    RESUBMITTED("Resubmitted", 6);

    private final String status;
    private final Integer steps;
}

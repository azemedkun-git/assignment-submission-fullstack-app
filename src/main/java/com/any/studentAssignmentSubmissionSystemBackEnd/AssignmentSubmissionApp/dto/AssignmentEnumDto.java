package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

//This class was created to marshal the enum to json manually.
//But after using @JsonFormat(shape = JsonFormat.Shape.Object) at the enum itself,
//this is not required
@Getter
@Setter
@AllArgsConstructor
public class AssignmentEnumDto {
    private Integer assignmentNum;
    private String assignmentName;
}

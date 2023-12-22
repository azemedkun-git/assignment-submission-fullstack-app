package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.dto;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Assignment;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
public class AssignmentResponseDto {
    private Assignment assignment;
    @Setter(AccessLevel.NONE)
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    @Setter(AccessLevel.NONE)
    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
    //private List<AssignmentEnumDto> assignmentEnums = new ArrayList<>();
    public AssignmentResponseDto(Assignment assignment){
        this.assignment = assignment;
//        Arrays.stream(AssignmentEnum.values()).forEach(assignmentEnum1 ->{
//            assignmentEnums.add( new AssignmentEnumDto(assignmentEnum1.getAssignmentNum(), assignmentEnum1.getAssignmentName()));
//        } );
    }
}

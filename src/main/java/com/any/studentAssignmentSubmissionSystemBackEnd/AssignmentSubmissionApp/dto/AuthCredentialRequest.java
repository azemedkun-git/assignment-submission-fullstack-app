package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthCredentialRequest {
    private String username;
   private String password;
}

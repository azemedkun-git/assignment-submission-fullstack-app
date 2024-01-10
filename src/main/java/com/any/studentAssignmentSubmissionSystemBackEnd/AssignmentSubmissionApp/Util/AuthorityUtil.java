package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.Util;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;

public class AuthorityUtil {
    public static Boolean hasRole(String role, User user){
        return user.getAuthorities()
                .stream().anyMatch(auth -> auth.getAuthority().equals(role));
    }
}

package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    public Optional<User> findUserByUsername(String username){
        return userRepo.findByUsername(username);
    }
}

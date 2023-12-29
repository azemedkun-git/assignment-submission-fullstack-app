package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.service;

import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.Util.CustomPasswordEncoder;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.Authority;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain.User;
import com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    private Set<GrantedAuthority> authoritySet = new HashSet<>();
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt=userRepository.findByUsername(username);
//        System.out.println("GRANTED$$$$$$$$$$$$ "
//                + userOpt.get().getAuthorities().stream().collect(Collectors.toSet()));
//        System.out.println();
        return userOpt.orElseThrow(()-> new UsernameNotFoundException("Invalid credentials"));
    }
}

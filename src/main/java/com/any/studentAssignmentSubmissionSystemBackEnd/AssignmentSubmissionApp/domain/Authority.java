package com.any.studentAssignmentSubmissionSystemBackEnd.AssignmentSubmissionApp.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Authority implements GrantedAuthority {
    private static final long serialVersionUID = 1L;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String authority;
    @ManyToOne(optional = false)
    private User user;

    public Authority(String authority){
        this.authority = authority;
    }

}

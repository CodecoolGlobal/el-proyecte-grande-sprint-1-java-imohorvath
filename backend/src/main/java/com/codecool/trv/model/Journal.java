package com.codecool.trv.model;
import com.codecool.trv.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="journals")
public class Journal {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name="owner_user_id", referencedColumnName = "id")
    private User owner;

    @Column(name="modified_at")
    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name="modified_by_user_id", referencedColumnName = "id")
    private User modifiedBy;

    @OneToMany(cascade=CascadeType.PERSIST)
    private final Set<User> contributors = new HashSet<>();

    @OneToMany(cascade=CascadeType.PERSIST)
    private final Set<Note> notes = new HashSet<>();

}

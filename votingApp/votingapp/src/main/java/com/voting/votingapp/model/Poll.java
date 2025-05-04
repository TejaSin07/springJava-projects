package com.voting.votingapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    @ElementCollection   //used to create new table without new entity
    private List<OptionVote> options = new ArrayList<>();

    public Poll() {
    }

//    @ElementCollection
//    private List<Long> votes = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<OptionVote> getOptions() {
        return options;
    }

    public void setOptions(List<OptionVote> options) {
        this.options = options;
    }

//    public List<Long> getVotes() {
//        return votes;
//    }
//
//    public void setVotes(List<Long> votes) {
//        this.votes = votes;
//    }



}

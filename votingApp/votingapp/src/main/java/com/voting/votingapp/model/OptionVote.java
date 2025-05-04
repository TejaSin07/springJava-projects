package com.voting.votingapp.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class OptionVote {


    private String voteOption;
    private Long voteCount;


    public String getVoteOption() {
        return voteOption;
    }

    public void setVoteOption(String option) {
        this.voteOption = option;
    }

    public Long getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Long voteCount) {
        this.voteCount = voteCount;
    }

    public OptionVote() {
    }
}

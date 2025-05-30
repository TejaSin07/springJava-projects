package com.voting.votingapp.services;


import com.voting.votingapp.model.OptionVote;
import com.voting.votingapp.model.Poll;
import com.voting.votingapp.repositories.PollRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {
     private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional <Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) {
        //get the poll from db
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll not found"));

        //get all the option
        List<OptionVote> options = poll.getOptions();

        //If the index for vote is not valid,throw error
        if(optionIndex < 0 || optionIndex >= options.size()){
            throw new IllegalArgumentException("Invalid option inddex");
        }
        //get selected option
        OptionVote selectedOption = options.get(optionIndex);
        // Increment vote for selected option
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1); 

        //save inncremented vote option into the database
        pollRepository.save(poll);
    }
}

package com.codecool.trv.service;

import com.codecool.trv.dto.note.NoteResponse;
import com.codecool.trv.dto.note.UpdateNoteResponse;
import com.codecool.trv.exception.ResourceNotFoundException;
import com.codecool.trv.dto.note.NewNote;
import com.codecool.trv.model.Note;
import com.codecool.trv.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    private final UserService userService;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserService userService) {
        this.noteRepository = noteRepository;
        this.userService = userService;
    }

    Note findNoteById(Long noteId) {
        return noteRepository.findById(noteId).orElseThrow(()-> new ResourceNotFoundException("Note is not found with id: " + noteId));
    }

    public NoteResponse findNoteResponseById(Long noteId) {
        Note note = findNoteById(noteId);
        return NoteResponse.builder()
                .id(note.getId())
                .text(note.getText())
                .createdAt(note.getCreatedAt())
                .createdBy(note.getCreatedBy())
                .geoIP(note.getGeoIP())
                .journal(note.getJournal())
                .updatedAt(note.getUpdatedAt())
                .updatedBy(note.getUpdatedBy())
                .build();
    }

    public UpdateNoteResponse updateNoteById(Long noteId) {
        //TODO
        return null;
    }

    public void deleteNoteById(Long noteId) {
        noteRepository.deleteById(noteId);
    }

    public List<Note> findAllNotesByJournalId(int id) {
        //TODO
        return null;
    }

    public Note addNewNoteToJournal(NewNote newNote) {
        //TODO
        return null;
        /*User creator = userDao.findUserById(newNote.getUserId());
        Journal journal = journalDao.findJournalById(newNote.getJournalId());
        return noteDao.addNewNoteToJournal(newNote.getText(), journal, creator);*/
    }

    public List<Note> deleteAllNotesByJournalId(int journalId) {
        //TODO
        return null;
        //return noteDao.deleteAllNotesByJournalId(journalId);
    }

    public Note deleteNoteByIdFromJournalById(int journalId, int noteId) {
        //TODO
        return null;
        //return noteDao.deleteNoteByIdFromJournalById(journalId, noteId);
    }


}

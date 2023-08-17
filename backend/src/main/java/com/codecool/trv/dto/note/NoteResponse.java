package com.codecool.trv.dto.note;

import com.codecool.trv.dto.user.UserResponse;
import com.codecool.trv.model.GeoIP;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
public record NoteResponse(Long id, String text, LocalDateTime createdAt, UserResponse createdBy, GeoIP geoIP, Long journalId, LocalDateTime updatedAt, UserResponse updatedBy, Set<String> imageLinks) {
}



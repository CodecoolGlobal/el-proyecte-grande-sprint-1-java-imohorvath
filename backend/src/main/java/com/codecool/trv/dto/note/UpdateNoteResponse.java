package com.codecool.trv.dto.note;

import com.codecool.trv.dto.user.UserResponse;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UpdateNoteResponse(LocalDateTime updatedAt, UserResponse updatedBy, String text) {
}
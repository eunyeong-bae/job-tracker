package io.github.eunyeongbae.jobtracker.jobapplication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(
        @NotNull(message = "변경할 지원 상태를 선택해주세요.")Status status
) {
}

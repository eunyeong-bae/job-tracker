package io.github.eunyeongbae.jobtracker.jobapplication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateJobApplicationRequest(
       @NotBlank(message = "회사명을 입력해주세요.") String companyName,
       @NotBlank(message = "포지션명을 입력해주세요.") String position,
       @NotNull(message = "현재 지원상태를 선택해주세요.") Status status,
       @PositiveOrZero(message = "희망연봉은 0 이상이어야 합니다.") Integer salary
) {
}

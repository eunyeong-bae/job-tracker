package io.github.eunyeongbae.jobtracker.jobapplication;

public record CreateJobApplicationRequest(
        String companyName,
        String position,
        Status status,
        Integer salary
) {
}

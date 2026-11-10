package io.github.eunyeongbae.jobtracker.jobapplication;

public record JobApplication(Long id, String companyName, String position, Status status, Integer salary) {
}

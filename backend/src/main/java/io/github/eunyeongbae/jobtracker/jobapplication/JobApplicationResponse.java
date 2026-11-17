package io.github.eunyeongbae.jobtracker.jobapplication;

// API 응답용. JSON 모양은 기존 record와 동일
public record JobApplicationResponse(
        Long id,
        String companyName,
        String position,
        Status status,
        Integer salary
) {
    // Entity → 응답 DTO 변환
    public static JobApplicationResponse from(JobApplication jobApplication){
        return new JobApplicationResponse(
                jobApplication.getId(),
                jobApplication.getCompanyName(),
                jobApplication.getPosition(),
                jobApplication.getStatus(),
                jobApplication.getSalary()
        );
    }
}

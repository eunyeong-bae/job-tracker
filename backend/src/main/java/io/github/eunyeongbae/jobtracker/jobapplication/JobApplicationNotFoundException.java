package io.github.eunyeongbae.jobtracker.jobapplication;

// 요청한 id의 지원 현황이 없을 때
public class JobApplicationNotFoundException extends RuntimeException {
    public JobApplicationNotFoundException(Long id) {
        super("지원 현황을 찾을 수 없습니다. (id: " + id + ")");
    }
}

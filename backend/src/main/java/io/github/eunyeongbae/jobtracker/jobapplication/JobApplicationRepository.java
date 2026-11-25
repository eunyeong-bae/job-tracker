package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // 메서드 이름으로 쿼리 생성: where status = ? order by...
    List<JobApplication> findByStatus(Status status, Sort sort);
}


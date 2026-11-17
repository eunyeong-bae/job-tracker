package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Service
@Transactional(readOnly = true) // 기본은 읽기 전용 트랜잭션
public class JobApplicationService {
    private final JobApplicationRepository repository;

    // 생성자 주입 : spring이 repository 구현체를 넣어 줌
    public JobApplicationService(JobApplicationRepository repository){
        this.repository =  repository;
    }

    // 지원 목록 전체 조회
    public List<JobApplicationResponse> findAll() {
        return repository.findAll().stream()
                .map(JobApplicationResponse::from)
                .toList();
    }

    // 지원 현황 추가
   @Transactional
    public JobApplicationResponse create(CreateJobApplicationRequest request) {
        JobApplication jobApplication = new JobApplication(
                request.companyName(),
                request.position(),
                request.status(),
                request.salary()
        );

        return JobApplicationResponse.from(repository.save(jobApplication));
   }


}

package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class JobApplicationService {
    // 메모리 저장소
    private final List<JobApplication> store = new CopyOnWriteArrayList<>();

    // id 발급기.
    private final AtomicLong sequence = new AtomicLong();

    // 서버 시작 시 더미 데이터 등록
    public JobApplicationService() {
        create(new CreateJobApplicationRequest("A", "MOBILE frontend", Status.BEFORE_APPLY, 5100));
        create(new CreateJobApplicationRequest("B", "WEB frontend", Status.INTERVIEW, 4700));
        create(new CreateJobApplicationRequest("C", "frontend", Status.ASSIGNMENT, null));
    }

    // 지원 목록 전체 조회
    public List<JobApplication> findAll() {
        return List.copyOf(store);
    }

    // 지원 현황 추가
    public JobApplication create(CreateJobApplicationRequest request){
        JobApplication jobApplication = new JobApplication(
            sequence.incrementAndGet(),
            request.companyName(),
            request.position(),
            request.status(),
            request.salary()
        );

        store.add(jobApplication);

        return jobApplication;
    }


}

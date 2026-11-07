package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobApplicationService {
    // 지원 목록 전체 조회(DB 연결 전 임시 데이터)
    public List<JobApplication> findAll() {
        return List.of(
                new JobApplication("A","MOBILE frontend", Status.BEFORE_APPLY, 5100),
                new JobApplication("B","WEB frontend", Status.INTERVIEW, 4700),
                new JobApplication("C","frontend", Status.ASSIGNMENT, null)
        );
    }

}

//same as list TS: findAll():JobApplication[]{return [...]};

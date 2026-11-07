package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {
    private final JobApplicationService service;

    //1.생성자 주입: Spring이 Service 객체를 넣어줌
    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    //2.GET /api/applications: 지원 목록 전체 조회
    @GetMapping
    public List<JobApplication> findAll() {
        return service.findAll();
    }
}

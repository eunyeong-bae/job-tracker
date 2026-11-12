package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<JobApplication> create(@RequestBody CreateJobApplicationRequest request){
        //service.create 호출 -> 201 상태로 결과 반환
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }
}

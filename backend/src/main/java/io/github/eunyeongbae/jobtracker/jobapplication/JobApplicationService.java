package io.github.eunyeongbae.jobtracker.jobapplication;

import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Service
@Transactional(readOnly = true) // 기본은 읽기 전용 트랜잭션
public class JobApplicationService {
    private final JobApplicationRepository repository;
    private static final Set<String> SORTABLE_PROPERTIES = Set.of("id", "salary", "companyName");

    // 생성자 주입 : spring이 repository 구현체를 넣어 줌
    public JobApplicationService(JobApplicationRepository repository){
        this.repository =  repository;
    }

    // 지원 목록 전체 조회
    public List<JobApplicationResponse> findAll(Status status, Sort sort) {
        // 허용하지 않는 필드로 정렬하려 하면 400으로 응답하기 위해 먼저 검사
        for(Sort.Order order : sort) {
           if(!SORTABLE_PROPERTIES.contains(order.getProperty())){
               throw new InvalidSortPropertyException(order.getProperty());
           };
        }

        List<JobApplication> applications = (status == null)
                ? repository.findAll(sort)
                : repository.findByStatus(status, sort);
        return applications.stream()
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

   // 지원 상태 변경
    @Transactional
    public JobApplicationResponse updateStatus(Long id, UpdateStatusRequest request) {
        JobApplication jobApplication = repository.findById(id)
                .orElseThrow(() -> new JobApplicationNotFoundException(id));

        jobApplication.changeStatus(request.status());
        // save() 호출하지 않아도 트랜잭션이 끝날 때 업데이트가 실행됨(변경감지)
        return JobApplicationResponse.from(jobApplication);
    }

    // 지원 현황 삭제
    @Transactional
    public void delete(Long id) {
        if(!repository.existsById(id)) {
            throw new JobApplicationNotFoundException(id);
        }

        repository.deleteById(id);
    }

}

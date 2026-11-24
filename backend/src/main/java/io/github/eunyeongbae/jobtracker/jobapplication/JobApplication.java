package io.github.eunyeongbae.jobtracker.jobapplication;

import jakarta.persistence.*;

@Entity
public class JobApplication {

    // 기본키. 값은 DB가 자동 증가로 발급
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String position;

    // enum을 이름(문자열)으로 저장. 기본값(순서 번호)은 enum 순서가 바뀌면 데이터가 깨짐
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    // 희망 연봉은 비어 있을 수 있음
    private Integer salary;

    // JPA가 객체를 만들 때 쓰는 기본 생성자. 외부에서 빈 객체를 만들지 못하게 protected
    protected JobApplication() {
    }

    // 새 지원 현황 생성용. id는 DB가 발급하므로 받지 않음
    public JobApplication(String companyName, String position, Status status, Integer salary) {
        this.companyName = companyName;
        this.position = position;
        this.status = status;
        this.salary = salary;
    }

    public Long getId() { return id; }
    public String getCompanyName() { return companyName; }
    public String getPosition() { return position; }
    public Status getStatus() { return status; }
    public Integer getSalary() { return salary; }

    // 지원 상태 변경
    public void changeStatus(Status status) {
        this.status = status;
    }
}
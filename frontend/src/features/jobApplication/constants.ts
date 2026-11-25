import type { ApplicationStatus, SortOption } from "../../types/JobApplication";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
    BEFORE_APPLY: '지원 전',
    APPLIED: '지원 완료',
    ASSIGNMENT: '과제 진행 중',
    INTERVIEW: '면접 진행 중',
    REJECTED: '탈락',
    ACCEPTED: '합격'
};

export const SORT_LABEL: Record<SortOption, string> = {
    'id,desc' : '최신순',
    'salary,desc' : '연봉 높은 순',
    'companyName,asc' : '회사명순'
}
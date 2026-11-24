import type { ApplicationStatus } from "../../types/JobApplication";

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
    BEFORE_APPLY: '지원 전',
    APPLIED: '지원 완료',
    ASSIGNMENT: '과제 진행 중',
    INTERVIEW: '면접 진행 중',
    REJECTED: '탈락',
    ACCEPTED: '합격'
};
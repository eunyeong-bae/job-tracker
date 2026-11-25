export type ApplicationStatus = 
    | 'BEFORE_APPLY'
    | 'APPLIED'
    | 'ASSIGNMENT'
    | 'INTERVIEW'
    | 'REJECTED'
    | 'ACCEPTED';

export interface JobApplication {
    id: number;
    companyName: string;
    position: string;
    status: ApplicationStatus;
    salary: number | null;
}

export type JobApplicationRequest = Omit<JobApplication, 'id'>;

export interface ProblemDetail {
    title: string;
    status: number;
    detail?: string;
    errors?: Record<string, string>;
}

export type SortOption = 'id,desc' | 'salary,desc' | 'companyName,asc';

export interface JobApplicationFilters{
    status?: ApplicationStatus; //없으면 전체
    sort: SortOption;
}
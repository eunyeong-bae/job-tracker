export type ApplicationStatus = 
    | 'BEFORE_APPLY'
    | 'APPLIED'
    | 'ASSIGNMENT'
    | 'INTERVIEW'
    | 'REJECTED'
    | 'ACCEPTED';

export interface JobApplication {
    companyName: string;
    position: string;
    status: ApplicationStatus;
    salary: number | null;
}
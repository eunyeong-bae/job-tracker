import type { 
    ApplicationStatus, 
    JobApplication, 
    JobApplicationRequest, 
    ProblemDetail 
} from '../../types/JobApplication';

// 실패 응답이면 ProblemDetail 읽어 에러 던지는 공통 함수
const throwIfNotOk = async(response: Response, fallback: string) => {
    if(response.ok) return;

    const body: ProblemDetail | null = await response.json().catch(() => null);

    const message = 
        (body?.errors && Object.values(body.errors).join('\n')) ||
        body?.detail || `${fallback} (${response.status})`;
    
    throw new Error(message);
}

export const fetchJobApplications = async():Promise<JobApplication[]> => {
    const response = await fetch('/api/applications');

    await throwIfNotOk(response, '지원 목록 조회 실패');

    return response.json();
}

export const createJobApplication = async(body: JobApplicationRequest): Promise<JobApplication> => {
    const response = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );

    await throwIfNotOk(response, '지원서 생성 실패');

    return response.json();
}

export const updateJobApplicationStatus = async(id: number, status: ApplicationStatus): Promise<JobApplication> => {
    const response = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({status})
    });

    await throwIfNotOk(response, '지원 상태 변경 실패');

    return response.json();
}

export const deleteJobApplication = async(id: number): Promise<void> => {
    const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE'
    });

    await throwIfNotOk(response, '지원서 삭제 실패');
}
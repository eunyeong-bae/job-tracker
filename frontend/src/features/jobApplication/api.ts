import type { JobApplication, JobApplicationRequest } from '../../types/JobApplication';

export const fetchJobApplications = async():Promise<JobApplication[]> => {
    const response = await fetch('/api/applications');

    if(!response.ok) {
        throw new Error(`지원 목록 조회 실패 (${response.status})`);
    }

    return await response.json()
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

    if(!response.ok) {
        throw new Error(`지원서 생성 실패 (${response.status})`);
    }

    return response.json();
}
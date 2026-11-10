import type { JobApplication } from '../../types/JobApplication';

export const fetchJobApplications = async():Promise<JobApplication[]> => {
    const response = await fetch('/api/applications');

    if(!response.ok) {
        throw new Error(`지원 목록 조회 실패 (${response.status})`);
    }

    return await response.json()
}
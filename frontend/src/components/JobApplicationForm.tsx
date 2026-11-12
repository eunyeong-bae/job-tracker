import { useState } from 'react';
import {useCreateJobApplication} from '../features/jobApplication/hook'
import type { JobApplicationRequest } from '../types/JobApplication';

const initialForm: JobApplicationRequest = {
    companyName: '',
    position: '',
    status: 'BEFORE_APPLY',
    salary: null
};

function JobApplicationForm() {
    const [form, setForm] = useState<JobApplicationRequest>(initialForm);

    const {mutate: createJobApplication, isPending, isError, error} = useCreateJobApplication();

    return (
    <>
        
        <form 
            className="form" 
            style={{display: 'flex', flexDirection: 'column', gap: '1rem', border:' 1px solid #ccc', padding: '1rem', borderRadius: '0.5rem'}}
            onSubmit={(e) => {
                e.preventDefault();
                createJobApplication(form, {
                    onSuccess: () => setForm(initialForm)
                });
                
            }}
        >
            <div>
                <label htmlFor="companyName">회사명</label>
                <input 
                    type="text" 
                    name="companyName" 
                    id="companyName" 
                    required 
                    value={form.companyName}
                    onChange={(e) => setForm((prev) => ({...prev, companyName: e.target.value}))}
                />
            </div>
            <div>
                <label htmlFor="position">포지션</label>
                <input 
                    type="text" 
                    name="position" 
                    id="position" 
                    required 
                    value={form.position}
                    onChange={(e) => setForm((prev) => ({...prev, position: e.target.value}))}
                />
            </div>
            <div>
                <label htmlFor="status">상태</label>
                <select 
                    name="status" 
                    id="status" 
                    required
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({...prev, status: e.target.value as JobApplicationRequest['status']}))}
                >
                    <option value="BEFORE_APPLY">지원 전</option>
                    <option value="APPLIED">지원 완료</option>
                    <option value="ASSIGNMENT">과제 진행 중</option>
                    <option value="INTERVIEW">면접 진행 중</option>
                    <option value="REJECTED">탈락</option>
                    <option value="ACCEPTED">합격</option>
                </select>
            </div>
            <div>
                <label htmlFor="salary">희망 연봉</label>
                <input type="number" name="salary" id="salary" value={form.salary ?? ''} onChange={(e) => setForm((prev) => ({...prev, salary: e.target.value ? Number(e.target.value) : null}))} />
            </div>
            <button type="submit" disabled={isPending}>
                {isPending ? '제출 중...' : '지원서 제출'}
            </button>
        </form>

        {isError && <p>{error.message}</p>}
    </>
    )  
}

export default JobApplicationForm;
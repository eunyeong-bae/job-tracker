import {useState} from 'react';
import JobApplicationForm from './components/JobApplicationForm';
import { STATUS_LABEL } from './features/jobApplication/constants';
import { useDeleteJobApplication, useJobApplications, useUpdateJobApplicationStatus } from './features/jobApplication/hook';
import type {  ApplicationStatus, JobApplicationFilters} from './types/JobApplication';
import JobApplicationFilterBar from './components/JobApplicationFilterBar';

function App() {
  const [filters, setFilters] = useState<JobApplicationFilters>({
    sort: 'id,desc',
    status: undefined
  });
  const { data: jobApplications, isError, isPending, error } = useJobApplications(filters);
  const {mutate: updateStatus, isPending: isUpdating, error: updateError} = useUpdateJobApplicationStatus();
  const {mutate: deleteJobApplication, isPending: isDeleting, error: deleteError} = useDeleteJobApplication();

  if(isPending) return <p>loading....</p>
  if(isError) return <p>지원 목록 조회 실패: {error.message}</p>

  const handleDelete = (id: number) => {
    if(window.confirm('정말 삭제하시겠습니까?')) {
      deleteJobApplication(id);
    }
  };

  return (
    <div style={{margin: '0 auto', width: '80%', gap: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <JobApplicationForm />
      {updateError &&<p>{updateError.message}</p> }
      {deleteError &&<p>{deleteError.message}</p> }
      
      <JobApplicationFilterBar 
        filters={filters} 
        onChange={setFilters} 
      />
      <table >
        <thead >
          <tr>
            <th>ID</th>
            <th>지원한 회사</th>
            <th>지원한 포지션</th>
            <th>지원 상태</th>
            <th>희망 연봉</th>
            <th>삭제</th>
          </tr>
          
        </thead>
        <tbody>
            {jobApplications.map((jobApplication) => (
              <tr key={jobApplication.id}>
                <td>{jobApplication.id}</td>
                <td>{jobApplication.companyName}</td>
                <td>{jobApplication.position}</td>
                <td>
                  <select
                    value={jobApplication.status}
                    disabled={isUpdating}
                    onChange={(e) => {
                      updateStatus({id: jobApplication.id, status: e.target.value as ApplicationStatus});
                    }}
                  >
                    {Object.entries(STATUS_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{jobApplication.salary ?? '회사 내규에 따름'}</td>
                <td>
                  <button disabled={isDeleting} onClick={() => handleDelete(jobApplication.id)}>삭제</button>
                </td>
              </tr>
            ))}
            
        </tbody>
      </table>
    </div>
  )
}

export default App

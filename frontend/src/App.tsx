import { useJobApplications } from './features/jobApplication/hook';
import type { JobApplication } from './types/JobApplication';

function App() {

  const { data: jobApplications, isError, isPending } = useJobApplications();
  console.log("🚀 ~ App ~ jobApplications:", jobApplications)

  if(isPending) return <p>loading....</p>
  console.log("🚀 ~ App ~ isError:", isError)
  if(isError) return <p>지원 목록 조회 실패</p>

  return (
    <table >
      <thead >
        <tr>
          <th>ID</th>
          <th>지원한 회사</th>
          <th>지원한 포지션</th>
          <th>지원 상태</th>
          <th>희망 연봉</th>
        </tr>
        
      </thead>
      <tbody>
        {
        jobApplications?.map((jobApplication: JobApplication) => (
          <tr key={jobApplication.id}>
            <td>{jobApplication.id}</td>
            <td>{jobApplication.companyName}</td>
            <td>{jobApplication.position}</td>
            <td>{jobApplication.status}</td>
            <td>{jobApplication.salary ?? '회사 내규에 따름'}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default App

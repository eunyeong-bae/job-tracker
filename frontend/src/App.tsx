import { useState, useEffect } from 'react';
import type { JobApplication } from './types/JobApplication';

function App() {
  const [data, setData] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string| null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const callJobApplications = async() => {
        try{
          const response = await fetch('/api/applications');

          if(!response.ok) {
            console.log("🚀 ~ callJobApplications ~ response:", response)
            throw new Error( `지원 목록 조회 실패 (${response.status})`);
          }

          const applications: JobApplication[] = await response.json();
          setData(applications);

        }catch(e) {
          setError(e instanceof Error ? e.message : '알 수 없는 에러 발생');
        }finally {
          setLoading(false);
        }
      };

      callJobApplications();
  }, []);

  if(loading) return <p>loading....</p>
  if(error) return <p>{error}</p>

  return (
    <table >
      <thead >
        <tr>
          <th>지원한 회사</th>
          <th>지원한 포지션</th>
          <th>지원 상태</th>
          <th>희망 연봉</th>
        </tr>
        
      </thead>
      <tbody>
        {
        data.map((jobApplication, index) => (
          <tr key={index}>
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

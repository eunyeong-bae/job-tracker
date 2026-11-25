import { SORT_LABEL, STATUS_LABEL } from '../features/jobApplication/constants';
import type { JobApplicationFilters, ApplicationStatus, SortOption} from '../types/JobApplication';

interface Props {
    filters: JobApplicationFilters;
    onChange: (filters: JobApplicationFilters) => void;
}

function JobApplicationFilterBar({filters, onChange} : Props) {
    return (
        <div>
            <label htmlFor='status-filter'>상태</label>
            <select
                id="status-filter"
                value={filters.status ?? ''}
                onChange={(e) => {
                const value = e.target.value;
                onChange({ ...filters, status: value === '' ? undefined : (value as ApplicationStatus) });
                }}
            >
                <option value="">전체</option>
                {Object.entries(STATUS_LABEL).map(([value, label]) => 
                    <option key={value} value={value}>{label}</option>
                )}
            </select>

            <label htmlFor='sort-filter'>정렬</label>
            <select
                id="sort-filter"
                value={filters.sort}
                onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
            >
                {Object.entries(SORT_LABEL).map((([value, label]) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                )))}
            </select>
        </div>
    )
}

export default JobApplicationFilterBar;
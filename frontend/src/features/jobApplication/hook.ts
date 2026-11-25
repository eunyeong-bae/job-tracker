import {useQuery, useMutation, useQueryClient, keepPreviousData} from "@tanstack/react-query";
import { fetchJobApplications, createJobApplication, updateJobApplicationStatus, deleteJobApplication } from "./api";
import type { ApplicationStatus, JobApplicationFilters } from "../../types/JobApplication";

export const jobApplicationKeys = {
    all: ['jobApplications'] as const,
    list: (filters: JobApplicationFilters) => [...jobApplicationKeys.all, 'list', filters] as const,
}
export const useJobApplications = (filters: JobApplicationFilters) => {
    return useQuery({
        queryKey: jobApplicationKeys.list(filters),
        queryFn: () => fetchJobApplications(filters),
        placeholderData: keepPreviousData,
    });
}


export const useCreateJobApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createJobApplication,
        onSuccess: () => {
            // 목록 쿼리를 stale로 만들고 다시 가져오게 함
            queryClient.invalidateQueries({
                queryKey: jobApplicationKeys.all,
            })
        }
    });
}

export const useUpdateJobApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, status}: {id: number; status: ApplicationStatus}) => updateJobApplicationStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: jobApplicationKeys.all
            });
        }
    }) 
}

export const useDeleteJobApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteJobApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: jobApplicationKeys.all
            });
        }
    })
}
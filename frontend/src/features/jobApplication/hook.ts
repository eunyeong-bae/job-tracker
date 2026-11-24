import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { fetchJobApplications, createJobApplication, updateJobApplicationStatus, deleteJobApplication } from "./api";
import type { ApplicationStatus } from "../../types/JobApplication";

export const jobApplicationKeys = {
    all: ['jobApplications'] as const,
}
export const useJobApplications = () => {
    return useQuery({
        queryKey: jobApplicationKeys.all,
        queryFn: fetchJobApplications,
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
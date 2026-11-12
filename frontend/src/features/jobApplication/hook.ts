import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { fetchJobApplications, createJobApplication } from "./api";

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
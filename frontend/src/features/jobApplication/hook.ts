import {useQuery} from "@tanstack/react-query";
import { fetchJobApplications } from "./api";

export const useJobApplications = () => {
    return useQuery({
        queryKey: ['jobApplications'],
        queryFn: fetchJobApplications,
    });
}
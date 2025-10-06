"use client"

import { ResumeType, UpdateResumeType } from "@/lib/validations/resume";
import { useTRPC } from "@/server/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useState, createContext, useContext, FC, ReactNode, useEffect } from "react";


type ResumeContextType = {
    resumeInfo: ResumeType | undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    refetch: () => void;
    onUpdate: (data: UpdateResumeType) => void;
}

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(
    undefined
);



export const ResumeInfoProvider: FC<{ resumeId: string, children: ReactNode }> = ({ resumeId, children }: { resumeId: string, children: ReactNode }) => {
    const trpc = useTRPC();
    const { data, isSuccess, isError, isLoading, refetch } = useQuery(trpc.resume.getOne.queryOptions({
        resumeId: resumeId
    }));
    const [resumeInfo, setResumeInfo] = useState<ResumeType>();
    useEffect(() => {
        if (isSuccess && data) {
            setResumeInfo(data)
        }
    }, [isSuccess, data]);

    const onUpdate = (updateData: UpdateResumeType) => {
        setResumeInfo((prev) => prev ? { ...prev, ...updateData } : prev);
    }


    return <ResumeInfoContext.Provider
        value={{
            resumeInfo,
            isLoading,
            isError,
            isSuccess,
            refetch,
            onUpdate
        }}
    >
        {children}
    </ResumeInfoContext.Provider>
}


export const useResumeContext = () => {
    const context = useContext(ResumeInfoContext);
    if (!context) {
        throw new Error(
            "useCurrentUserContext must be used within a ResumeInfoProvider"
        );
    }
    return context;
}

"use client"

import { ResumeType, UpdateResumeType } from "@/lib/validations/resume";
import { trpc } from "@/server/trpc/server";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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



export const ResumeInfoProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const params = useParams();
    const resumeId = params.resumeId as string;
    const { data, isSuccess, isError, isLoading, refetch } = useQuery(trpc.resume.getOne.queryOptions({ resumeId }));
    const [resumeInfo, setResumeInfo] = useState<ResumeType>();
    useEffect(() => {
        if (isSuccess) setResumeInfo(data);
    }, [isSuccess]);

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

"use client"

import ResumeItemCard from "@/components/resume/ResumeItem"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2Icon, Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useTRPC } from "@/server/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export default function ResumeItemList() {
    const trpc = useTRPC();
    const router = useRouter();
    const pathname = usePathname();

    const createResume = useMutation(
        trpc.resume.create.mutationOptions({
            onSuccess: (data) => {
                router.push(`${pathname}/edit/${data.resumeId}`)
            },
            onError: (err) => {
                console.log('Failed to create resume', err.message);
                toast.error('Failed to create resume');
            }
        })
    )

    const handleCreateResume = () => {
        createResume.mutate();
    }

    const { data, isPending, isError } = useQuery({
        ...trpc.resume.getAll.queryOptions(),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
    });

    return (
        <>
            {createResume.isPending && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2Icon className="size-8 animate-spin text-primary" />
                        <span className="text-sm font-medium">Creating Resume...</span>
                    </div>
                </div>
            )}

            <Card className="w-52 h-55 flex flex-col border-2 hover:shadow-lg hover:border-violet-300 transition rounded-xl cursor-pointer" onClick={handleCreateResume}>
                <CardContent className="flex-1 flex items-center justify-center p-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-primary">
                        <Plus className="w-8 h-8" />
                        <span className="text-sm font-medium">Create Resume</span>
                    </div>
                </CardContent>
            </Card>

            {!data ? (
                <div className="w-52 h-55 flex justify-center items-center">
                    <Loader2Icon className="size-8 animate-spin text-primary" />
                </div>

            ) : (
                data.map(resume => <ResumeItemCard key={resume.id} resume={resume} />)
            )}

        </>
    )
}

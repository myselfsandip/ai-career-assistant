import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate"
import { MoreHorizontal, FileText, Lock, Plus, TrashIcon, PenIcon, FilePen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/server/trpc/client"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/useConfirm"

type Resume = {
    id: string
    title: string
    createdAt: string
    isPublic?: boolean | null;
    preview?: string
}

const ResumeItemCard = ({ resume }: { resume: Resume }) => {
    const isBlank = resume.id === "blank";
    const pathname = usePathname();
    const trpc = useTRPC();

    const { confirm, ConfirmDialog } = useConfirm();

    const queryClient = useQueryClient();

    const deleteResumeMutation = useMutation(trpc.resume.delete.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: trpc.resume.getAll.queryKey()
            });
            toast.success('Resume deleted successfully');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to delete resume');
        }
    }))

    const handleDelete = async () => {
        const confirmed = await confirm({
            title: "Are you sure?",
            description: `The following action will remove this Resume`,
            confirmText: "Delete Resume",
            cancelText: "Cancel",
            variant: "destructive"
        })

        if (!!confirmed) {
            deleteResumeMutation.mutate({ resumeId: resume.id });
        }
    }

    return (
        <>
            <Card className="w-52 h-55 flex flex-col border-2 hover:shadow-lg hover:border-violet-300 transition rounded-xl">
                <CardContent className="flex-1 flex items-center justify-center p-4">
                    <Link href={`${pathname}/edit/${resume.id}`}> <FileText className="w-10 h-10 text-primary" /></Link>
                </CardContent>
                {!isBlank && (
                    <CardFooter className="flex flex-col gap-1 text-sm items-start px-3 py-2">
                        <div className="flex justify-between items-center w-full">
                            <p className="truncate font-medium">{resume.title}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => { redirect(`${pathname}/edit/${resume.id}`) }}>
                                        <span> <FilePen className="size-4" /> </span> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleDelete}>
                                        <span> <TrashIcon className="size-4" /> </span>Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            {!resume.isPublic && <Lock className="w-3 h-3" />}
                            <span>
                                {formatDate(resume.createdAt, "dd MMM yyyy, HH:mm a")}
                            </span>
                        </div>
                    </CardFooter>
                )}
            </Card>
            <ConfirmDialog />
        </>
    )
}

export default ResumeItemCard;
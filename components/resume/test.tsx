import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MoreHorizontal, FileText, Lock, Plus } from "lucide-react"

type Resume = {
    id: string
    title: string
    createdAt: string
    isPrivate: boolean
    preview?: string
}

const ResumeItemCard = ({ resume }: { resume: Resume }) => {
    const isBlank = resume.id === "blank"

    return (
        <Card className="w-52 h-64 flex flex-col border-2 hover:shadow-lg hover:border-violet-300 transition rounded-xl">
            <CardContent className="flex-1 flex items-center justify-center p-4">
                {isBlank ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-purple-600">
                        <Plus className="w-8 h-8" />
                        <span className="text-sm font-medium">Blank Resume</span>
                    </div>
                ) : resume.preview ? (
                    <img
                        src={resume.preview}
                        alt="resume preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <FileText className="w-10 h-10 text-gray-400" />
                )}
            </CardContent>
            {!isBlank && (
                <CardFooter className="flex flex-col gap-1 text-sm items-start px-3 py-2">
                    <div className="flex justify-between items-center w-full">
                        <p className="truncate font-medium">{resume.title}</p>
                        <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        {resume.isPrivate && <Lock className="w-3 h-3" />}
                        <span>
                            {new Date(resume.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default ResumeItemCard;
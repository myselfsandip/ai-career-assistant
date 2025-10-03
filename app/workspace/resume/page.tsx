"use client"

import ResumeItemList from "@/components/resume/ResumeItemList"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"






const Page = () => {
    return (
        <section>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-medium">Resume Builder</h1>
                        <p className="text-sm font-light">
                            Create your own custom resume with AI & Subscribe to the channel
                        </p>
                    </div>
                    <Button variant="outline" size="lg">
                        <Trash2Icon className="w-4 h-4 mr-2" />
                        Trash
                    </Button>
                </div>

                {/* All resumes */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-semibold">All Resume</h1>
                    <div className="flex gap-4 flex-wrap">
                        <ResumeItemList />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page

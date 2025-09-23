import React from "react"
import { Brain } from "lucide-react"

export function Logo() {
    return (
        <div className="flex items-center gap-2 font-semibold text-lg">
            <Brain className="w-5 h-5 text-muted-foreground" />
            <span className="tracking-tight">CareerAIssist</span>
        </div>
    )
}

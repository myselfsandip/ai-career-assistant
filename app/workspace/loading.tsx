import { Loader2Icon } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-3">
                <Loader2Icon className="size-8 animate-spin text-primary" />
                <span className="text-sm font-medium">Loading...</span>
            </div>
        </div>
    );
}

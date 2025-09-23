"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function useLogout() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const logout = () => {
        startTransition(async () => {
            const response = await authClient.signOut();

            if (response.error) {
                toast.error(response.error.message || "Logout failed");
            } else {
                toast.success("Logged out successfully");
                router.push("/login");
            }
        });
    };

    return { logout, isPending };
}

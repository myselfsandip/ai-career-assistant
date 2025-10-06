"use client"

import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { SignupForm } from "@/components/signup-form";

function SignUpFormModal() {
    const router = useRouter();

    return (
        <Dialog
            defaultOpen
            onOpenChange={(open) => {
                if (!open) {
                    router.back()
                }
            }}
        >
            <DialogContent>
                <VisuallyHidden>
                    <DialogTitle>Login to your account</DialogTitle>
                </VisuallyHidden>
                <SignupForm isModal={true} />
            </DialogContent>
        </Dialog>
    )
}

export default SignUpFormModal
"use client"

import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/login-form"
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

function LoginFormModal() {
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
                    <DialogTitle>Login to your account</DialogTitle> // Added for Accesebility of Dialog otherwise will give Error .
                </VisuallyHidden>
                <LoginForm isModal={true} />
            </DialogContent>
        </Dialog>
    )
}

export default LoginFormModal

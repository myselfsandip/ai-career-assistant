"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";
import { ChevronDownIcon, CreditCard, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

function DashboardUserButton() {
    const { logout, isPending } = useLogout();

    // Static user data for now
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        initials: "JD"
    };


    const handleBilling = () => {
        console.log('Navigate to billing');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
                {/* Simple avatar with initials */}
                <div className="size-9 mr-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.initials}
                </div>

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full">
                        {user.name}
                    </p>
                    <p className="text-xs truncate w-full text-muted-foreground">
                        {user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{user.name}</span>
                        <span className="font-normal text-sm text-muted-foreground truncate">{user.email}</span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={handleBilling}
                >
                    Billing
                    <CreditCard className="size-4" />
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer flex items-center justify-between"
                    onClick={logout}
                >
                    Logout
                    <LogOut className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default DashboardUserButton;

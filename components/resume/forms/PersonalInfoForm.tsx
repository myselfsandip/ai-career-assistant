"use client"

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/context/resume-info-provider";
import { cn } from "@/lib/utils";
import { personalInfoSchema, personalInfoType } from "@/lib/validations/resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function PersonalInfoForm() {
    const {onUpdate,} = useResumeContext();
    const [error, setError] = useState<string | null>(null);



    const form = useForm<personalInfoType>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            fullname: '',
            email: '',
            phone: '',
            address: '',
            jobTitle: '',
            linkedIn: '',
            website: ''
        }
    });


    const onSubmit = (values: personalInfoType) => {
        //
    }

    return <div className="w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 w-full px-4">
                    <div className="grid gap-3">
                        <FormField
                            name="fullname"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="John Doe"
                                            {...field}
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.fullname && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.email && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-3">
                        <FormField
                            name="phone"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="+91"
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.phone && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Baker Street, London"
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.address && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-3">
                        <FormField
                            name="jobTitle"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Backend Developer"
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.jobTitle && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-3">
                        <FormField
                            name="linkedIn"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            {...field}
                                            placeholder="https://www.linkedin.com/in/username"
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.linkedIn && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-3">
                        <FormField
                            name="website"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            {...field}
                                            placeholder="https://www.yourportfolio.com"
                                            className={cn(
                                                "shadow-accent-foreground",
                                                form.formState.errors.website && "border-red-500"
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {!!error && (
                        <Alert className="bg-destructive/10 border-none">
                            <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}


                    <div className="flex items-center justify-start">
                        <Button type="submit" className="">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    </div>
}
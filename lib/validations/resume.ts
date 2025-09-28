import * as z from "zod";

export const personalInfoSchema = z.object({
    fullname: z.string().trim().min(1, { message: 'Fullname is required' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    phone: z.string().trim().min(1, { message: 'Phone is required' }),
    address: z.string().trim().min(1, { message: 'Address is required' }),
    jobTitle: z.string().trim().min(1, { message: 'Job title is required' }),
    linkedIn: z.string().trim().url({ message: 'Invalid LinkedIn URL' }).optional(),
    website: z.string().trim().url({ message: 'Invalid website URL' }).optional(),
});

export type personalInfoType = z.infer<typeof personalInfoSchema>;

